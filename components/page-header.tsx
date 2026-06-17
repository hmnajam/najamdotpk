import { Reveal } from "@/components/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <Reveal as="header" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 -z-10 h-56 w-[32rem] max-w-full rounded-full bg-[radial-gradient(closest-side,hsl(var(--brand)/0.14),transparent)] blur-2xl"
      />
      {eyebrow && (
        <span className="mb-3 inline-block font-mono text-xs uppercase tracking-widest text-brand">
          {eyebrow}
        </span>
      )}
      <h1 className="text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </Reveal>
  );
}
