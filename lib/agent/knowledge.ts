import { getProjects, getPosts } from "@/lib/content";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { certifications, courseCertifications } from "@/data/certifications";
import { ventures } from "@/data/ventures";
import { siteConfig } from "@/config/site";
import { agentConfig } from "@/config/agent";

const rag = agentConfig.rag;

/**
 * Build-time grounding index for the assistant. The corpus is tiny (a handful
 * of MDX files + a few structured data modules) so a plain in-memory keyword
 * match is plenty — no vector DB. If the corpus grows a lot, swap `searchSite`
 * for a hosted vector store (Upstash Vector / pgvector) without touching callers.
 */

export type KnowledgeDoc = {
  id: string;
  title: string;
  /** On-site link the assistant can cite, when the doc maps to a page. */
  url?: string;
  kind:
    | "project"
    | "post"
    | "about"
    | "skills"
    | "experience"
    | "certifications"
    | "ventures";
  text: string;
};

/** Collapse MDX/markdown to rough plain text and cap length for prompt budget. */
function toPlain(md: string, max = 1200): string {
  const plain = md
    .replace(/```[\s\S]*?```/g, " ") // code fences
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/[#>*_`~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain.length > max ? `${plain.slice(0, max)}…` : plain;
}

let cachedDocs: KnowledgeDoc[] | null = null;

function buildDocs(): KnowledgeDoc[] {
  const docs: KnowledgeDoc[] = [];

  if (rag.sources.projects) {
    const projects = getProjects();
    for (const p of projects) {
      docs.push({
        id: `project:${p.slug}`,
        title: p.frontmatter.title,
        url: `/projects/${p.slug}`,
        kind: "project",
        text: `${p.frontmatter.title}. ${p.frontmatter.description}. Stack: ${(
          p.frontmatter.stack ?? []
        ).join(", ")}. ${toPlain(p.body, rag.projectBodyChars)}`,
      });
    }

    // Catalog doc: a single overview so broad questions like "what has Najam
    // built / worked on?" always retrieve the real project list, even when the
    // wording doesn't lexically overlap any individual project's title/body.
    if (projects.length > 0) {
      const list = projects
        .map((p) => `${p.frontmatter.title} — ${p.frontmatter.description}`)
        .join("; ");
      docs.push({
        id: "catalog:projects",
        title: "Projects Najam has built",
        url: "/projects",
        kind: "project",
        text: `Overview of the projects, apps, products, and work Najam has built, shipped, and worked on — his portfolio and case studies. ${list}`,
      });
    }
  }

  if (rag.sources.blog) {
    for (const post of getPosts()) {
      docs.push({
        id: `post:${post.slug}`,
        title: post.frontmatter.title,
        url: `/blog/${post.slug}`,
        kind: "post",
        text: `${post.frontmatter.title}. ${post.frontmatter.description}. ${toPlain(
          post.body,
          rag.postBodyChars
        )}`,
      });
    }
  }

  // Persona / bio — so the agent can describe Najam himself.
  if (rag.sources.about) {
    docs.push({
      id: "about:bio",
      title: `About ${siteConfig.name}`,
      url: "/about",
      kind: "about",
      text: `${siteConfig.name} — ${siteConfig.eyebrow}. ${siteConfig.description} ${siteConfig.intro}`,
    });
  }

  if (rag.sources.skills) {
    docs.push({
      id: "data:skills",
      title: "Skills & stack",
      url: "/about",
      kind: "skills",
      text: skills.map((g) => `${g.category}: ${g.items.join(", ")}`).join(". "),
    });
  }

  if (rag.sources.experience) {
    docs.push({
      id: "data:experience",
      title: "Experience",
      url: "/about",
      kind: "experience",
      text: experience
        .map((e) => `${e.role} at ${e.company} (${e.period}): ${e.description}`)
        .join(" "),
    });
  }

  if (rag.sources.ventures) {
    for (const v of ventures) {
      docs.push({
        id: `venture:${v.name}`,
        title: `${v.name} — ${v.tagline}`,
        url: v.url ?? "/ventures",
        kind: "ventures",
        text: `${v.name} is a startup Najam founded (${v.role}${v.period ? `, ${v.period}` : ""}, status: ${v.status}). ${v.tagline}. ${v.description} ${v.story}${v.outcome ? ` Outcome: ${v.outcome}.` : ""} Focus areas: ${v.tags.join(", ")}.`,
      });
    }
  }

  if (rag.sources.certifications) {
    docs.push({
      id: "data:certifications",
      title: "Certifications",
      url: "/certifications",
      kind: "certifications",
      text: [...certifications, ...courseCertifications]
        .map((c) => `${c.title} — ${c.issuer}, ${c.date}`)
        .join(". "),
    });
  }

  return docs;
}

function getDocs(): KnowledgeDoc[] {
  if (!cachedDocs) cachedDocs = buildDocs();
  return cachedDocs;
}

const STOP = new Set<string>(rag.stopwords);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

export type SearchHit = {
  title: string;
  url?: string;
  kind: KnowledgeDoc["kind"];
  snippet: string;
};

/**
 * Keyword-overlap retrieval over the corpus. Returns the top matches as
 * snippets the agent can ground its answer in (and cite via `url`).
 */
// Words that signal a visitor is asking about Najam's work/portfolio even when
// they don't name a specific project — used to boost project docs so broad
// questions ("what has he built?") reliably surface the catalog.
const PROJECT_INTENT = new Set([
  "built",
  "build",
  "building",
  "made",
  "make",
  "project",
  "projects",
  "work",
  "worked",
  "working",
  "portfolio",
  "app",
  "apps",
  "product",
  "products",
  "shipped",
  "ship",
  "case",
  "study",
  "studies",
  "experience",
]);

function toHit(doc: KnowledgeDoc): SearchHit {
  return {
    title: doc.title,
    url: doc.url,
    kind: doc.kind,
    snippet:
      doc.text.length > rag.snippetChars
        ? `${doc.text.slice(0, rag.snippetChars)}…`
        : doc.text,
  };
}

/** Persona/skills/catalog anchors returned when a query matches nothing. */
function fallbackHits(docs: KnowledgeDoc[], limit: number): SearchHit[] {
  const anchors = docs.filter(
    (d) =>
      d.id === "catalog:projects" || d.kind === "about" || d.kind === "skills"
  );
  return anchors.slice(0, limit).map(toHit);
}

export function searchSite(
  query: string,
  limit = rag.resultLimit
): SearchHit[] {
  const terms = tokenize(query);
  const docs = getDocs();

  if (terms.length === 0) {
    // No usable query terms → return the catalog/persona anchors as a fallback.
    return fallbackHits(docs, limit);
  }

  const wantsProjects = terms.some((t) => PROJECT_INTENT.has(t));

  const scored = docs.map((doc) => {
    const haystack = doc.text.toLowerCase();
    const titleLc = doc.title.toLowerCase();
    // Space-collapsed variants so a query like "RapidContent" still matches the
    // "Rapid Content" title (and vice-versa).
    const compactHay = haystack.replace(/\s+/g, "");
    const compactTitle = titleLc.replace(/\s+/g, "");
    let score = 0;
    for (const term of terms) {
      if (titleLc.includes(term) || compactTitle.includes(term)) {
        score += rag.titleWeight; // title matches weigh more
      }
      let matches = haystack.split(term).length - 1;
      if (matches === 0) matches = compactHay.split(term).length - 1;
      score += matches;
    }
    // Nudge project docs up when the question is about Najam's work.
    if (wantsProjects && doc.kind === "project" && score > 0) score += 2;
    return { doc, score };
  });

  const hits = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ doc }) => toHit(doc));

  // Never leave the agent empty-handed — a "what has he built?" style question
  // that lexically misses everything still gets the catalog/persona anchors.
  return hits.length > 0 ? hits : fallbackHits(docs, limit);
}
