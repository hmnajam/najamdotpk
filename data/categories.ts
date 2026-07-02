// Blog categories — the fixed set of topics I write about. Each has its own
// color used for auto-generated post covers and category badges.
export type Category = {
  label: string;
  // Tailwind gradient stops for the auto-generated cover background.
  cover: string;
  // Tailwind classes for the category badge/pill.
  badge: string;
};

export const categories: Category[] = [
  {
    label: "AI & Agents",
    cover: "from-violet-600 via-violet-700 to-indigo-800",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  },
  {
    label: "Engineering",
    cover: "from-sky-600 via-sky-700 to-blue-800",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  },
  {
    label: "Governance",
    cover: "from-emerald-600 via-emerald-700 to-teal-800",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  },
  {
    label: "Blockchain",
    cover: "from-amber-500 via-orange-600 to-orange-800",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  },
  {
    label: "Books",
    cover: "from-fuchsia-600 via-fuchsia-700 to-purple-800",
    badge: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
  },
];

const fallback: Category = {
  label: "Writing",
  cover: "from-slate-600 via-slate-700 to-slate-900",
  badge: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

export function getCategory(label?: string): Category {
  if (!label) return fallback;
  return categories.find((c) => c.label === label) ?? fallback;
}
