import { getCategory } from "@/data/categories";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// Auto-generated, on-brand cover for a post — a category-colored gradient with
// the title rendered over it. No image file needed; every post gets one for free.
export function PostCover({
  title,
  category,
  className,
  size = "card",
}: {
  title: string;
  category?: string;
  className?: string;
  size?: "card" | "hero";
}) {
  const cat = getCategory(category);

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden bg-gradient-to-br",
        cat.cover,
        className
      )}
    >
      {/* Subtle grid + corner glow for texture */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-3xl" />

      <div
        className={cn(
          "relative z-10 flex items-center justify-between gap-3 p-4 sm:p-5",
          size === "hero" && "p-6 sm:p-8"
        )}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/80">
          {cat.label}
        </span>
        <span className="font-mono text-[10px] tracking-tight text-white/70">
          {siteConfig.shortName}
        </span>
      </div>

      <h3
        className={cn(
          "relative z-10 p-4 font-semibold leading-tight tracking-tight text-white drop-shadow-sm sm:p-5",
          size === "hero"
            ? "p-6 text-2xl sm:p-8 sm:text-4xl"
            : "text-lg sm:text-xl"
        )}
      >
        {title}
      </h3>
    </div>
  );
}
