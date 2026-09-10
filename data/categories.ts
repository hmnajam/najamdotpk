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
    badge: "bg-violet-500/10 text-violet-800 border-violet-500/30 dark:bg-violet-500/15 dark:text-violet-300",
  },
  {
    label: "Engineering",
    cover: "from-sky-600 via-sky-700 to-blue-800",
    badge: "bg-sky-500/10 text-sky-800 border-sky-500/30 dark:bg-sky-500/15 dark:text-sky-300",
  },
  {
    label: "Governance",
    cover: "from-emerald-600 via-emerald-700 to-teal-800",
    badge: "bg-emerald-500/10 text-emerald-800 border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    label: "Blockchain",
    cover: "from-amber-700 via-orange-800 to-orange-950",
    badge: "bg-amber-500/10 text-amber-900 border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300",
  },
  {
    label: "Books",
    cover: "from-fuchsia-600 via-fuchsia-700 to-purple-800",
    badge: "bg-fuchsia-500/10 text-fuchsia-800 border-fuchsia-500/30 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
  },
];

const fallback: Category = {
  label: "Writing",
  cover: "from-slate-600 via-slate-700 to-slate-900",
  badge: "bg-slate-500/10 text-slate-800 border-slate-500/30 dark:bg-slate-500/15 dark:text-slate-300",
};

export function getCategory(label?: string): Category {
  if (!label) return fallback;
  return categories.find((c) => c.label === label) ?? fallback;
}
