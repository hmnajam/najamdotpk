import { getProjects, getPosts } from "@/lib/content";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";
import { certifications } from "@/data/certifications";
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
  kind: "project" | "post" | "about" | "skills" | "experience" | "certifications";
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
    for (const p of getProjects()) {
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

  if (rag.sources.certifications) {
    docs.push({
      id: "data:certifications",
      title: "Certifications",
      url: "/certifications",
      kind: "certifications",
      text: certifications
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
export function searchSite(
  query: string,
  limit = rag.resultLimit
): SearchHit[] {
  const terms = tokenize(query);
  const docs = getDocs();

  if (terms.length === 0) {
    // No usable query terms → return the persona/skills anchors as a fallback.
    return docs
      .filter((d) => d.kind === "about" || d.kind === "skills")
      .map((d) => ({ title: d.title, url: d.url, kind: d.kind, snippet: d.text }));
  }

  const scored = docs.map((doc) => {
    const haystack = doc.text.toLowerCase();
    const titleLc = doc.title.toLowerCase();
    let score = 0;
    for (const term of terms) {
      if (titleLc.includes(term)) score += rag.titleWeight; // title matches weigh more
      const matches = haystack.split(term).length - 1;
      score += matches;
    }
    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ doc }) => ({
      title: doc.title,
      url: doc.url,
      kind: doc.kind,
      snippet:
        doc.text.length > rag.snippetChars
          ? `${doc.text.slice(0, rag.snippetChars)}…`
          : doc.text,
    }));
}
