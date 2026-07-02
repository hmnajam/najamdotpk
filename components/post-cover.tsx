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
  image,
}: {
  title: string;
  category?: string;
  className?: string;
  size?: "card" | "hero";
  image?: string;
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
      {image ? (
        <>
          {/* Real cover image with a dark scrim so overlaid text stays legible */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        </>
      ) : (
        <>
          {/* Subtle grid + corner glow for texture */}
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
        </>
      )}

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
