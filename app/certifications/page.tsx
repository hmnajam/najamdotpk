import type { Metadata } from "next";

import { certifications } from "@/data/certifications";
import { Certifications } from "@/components/certifications";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Credentials and training in AI engineering, generative AI, and software.",
};

export default function CertificationsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Credentials"
        title="Certifications"
        description="Credentials and training behind the work — in AI engineering, generative AI, and software."
      />

      {certifications.length === 0 ? (
        <p className="text-muted-foreground">No certifications yet.</p>
      ) : (
        <Certifications items={certifications} />
      )}
    </div>
  );
}
