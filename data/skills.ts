export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "AI & Agents",
    items: [
      "AI Agents",
      "Agentic workflows",
      "Voice AI",
      "LLMs",
      "RAG",
      "MCP servers",
      "Agent Skills",
    ],
  },
  {
    category: "Agent SDKs & frameworks",
    items: ["OpenAI Agents SDK", "Anthropic Agents SDK", "CrewAI"],
  },
  {
    category: "Voice & Telephony",
    items: ["Voice AI", "SIP", "Local telephony", "LiveKit", "Twilio"],
  },
  {
    category: "Sovereign & Infrastructure",
    items: [
      "Self-hosted LLMs",
      "Air-gapped deployment",
      "On-prem hosting",
      "Docker",
      "Linux",
    ],
  },
  {
    category: "Models & Platforms",
    items: ["Claude", "OpenAI", "Vector DBs"],
  },
  {
    category: "Backend & Web",
    items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "TypeScript", "Next.js", "React"],
  },
  {
    category: "Tools",
    items: [
      "Claude Code",
      "Cursor",
      "VS Code",
      "Codex",
      "Antigravity",
      "OpenClaw",
      "Git",
    ],
  },
];

// Highlighted on the site with a star — your go-to tool.
export const favoriteTool = "Claude Code";
