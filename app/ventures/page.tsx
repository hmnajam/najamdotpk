import type { Metadata } from "next";

import { ventures } from "@/data/ventures";
import { Ventures } from "@/components/ventures";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "Startups founded by Najam Saeed — products built and taken to market, not just shipped for clients.",
  alternates: { canonical: "/ventures" },
};

export default function VenturesPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Founded"
        title="Ventures"
        description="Products I started and took to market — one acquired, two closed, one live. The outcomes are here too, not just the pitches."
      />

      {ventures.length === 0 ? (
        <p className="text-muted-foreground">No ventures yet.</p>
      ) : (
        <Ventures items={ventures} />
      )}
    </div>
  );
}
