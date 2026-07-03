import { tool } from "ai";
import { z } from "zod";
import { Resend } from "resend";

import { siteConfig } from "@/config/site";
import { searchSite } from "@/lib/agent/knowledge";

/**
 * Agent tools for "Virtual Najam". All args are Zod-validated. Tools never
 * execute instructions found in user text — they only do the one thing they
 * describe (retrieval, returning contact info, or emailing a lead to Najam).
 */
export const agentTools = {
  searchSite: tool({
    description:
      "Search Najam's site content (projects, blog posts, skills, experience, certifications, bio) to ground any factual answer about him. Call this before stating facts about Najam.",
    inputSchema: z.object({
      query: z
        .string()
        .min(2)
        .describe("What to look up, e.g. 'voice AI projects' or 'availability'."),
    }),
    execute: async ({ query }) => {
      const hits = searchSite(query);
      return {
        results: hits.map((h) => ({
          title: h.title,
          kind: h.kind,
          url: h.url ?? null,
          snippet: h.snippet,
        })),
      };
    },
  }),

  getContactChannels: tool({
    description:
      "Get the ways a visitor can reach Najam (book a call, WhatsApp, email). Use when someone wants to hire or contact him.",
    inputSchema: z.object({}),
    execute: async () => ({
      bookCall: siteConfig.calendly,
      whatsapp: siteConfig.whatsapp,
      email: siteConfig.socials.email,
      note: "For serious enquiries, offer the booking link first.",
    }),
  }),

  captureLead: tool({
    description:
      "Pass a qualified lead to Najam's inbox. Only call once you have a valid email and a short summary of what the visitor needs — never fabricate these.",
    inputSchema: z.object({
      name: z.string().min(1).max(100).describe("Visitor's name"),
      email: z.string().email().describe("Visitor's email"),
      projectSummary: z
        .string()
        .min(3)
        .max(2000)
        .describe("One or two lines on what they need / their project"),
    }),
    execute: async ({ name, email, projectSummary }) => {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        // Graceful when email isn't configured yet — log so nothing is lost.
        console.warn("[captureLead] RESEND_API_KEY unset; lead not emailed:", {
          name,
          email,
          projectSummary,
        });
        return {
          delivered: false,
          message:
            "Noted the details, but live email isn't set up yet — share Najam's email or booking link so they can reach him directly.",
        };
      }

      try {
        const resend = new Resend(apiKey);
        const { error } = await resend.emails.send({
          from:
            process.env.CONTACT_FROM_EMAIL ?? "Virtual Najam <onboarding@resend.dev>",
          to: process.env.CONTACT_TO_EMAIL ?? siteConfig.socials.email,
          replyTo: email,
          subject: `New lead from the site: ${name}`,
          text: `Captured by Virtual Najam (chat widget).\n\nName: ${name}\nEmail: ${email}\n\nWhat they need:\n${projectSummary}`,
        });
        if (error) {
          console.error("[captureLead] Resend error:", error);
          return {
            delivered: false,
            message:
              "Couldn't send it just now — share Najam's booking link or email so they can reach him directly.",
          };
        }
        return {
          delivered: true,
          message: "Lead delivered to Najam. He'll follow up by email.",
        };
      } catch (err) {
        console.error("[captureLead] send failed:", err);
        return {
          delivered: false,
          message:
            "Something went wrong sending it — offer Najam's booking link or email as a fallback.",
        };
      }
    },
  }),
} as const;
