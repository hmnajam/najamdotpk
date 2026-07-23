import type { Metadata } from "next";

import { certifications, courseCertifications } from "@/data/certifications";
import { CertificationList, Certifications } from "@/components/certifications";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Credentials and training in AI engineering, generative AI, and software.",
  alternates: { canonical: "/certifications" },
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

      {courseCertifications.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-medium tracking-tight">
              Course certificates
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The individual courses behind the professional certificate — each
              one independently verifiable.
            </p>
          </div>
          <CertificationList items={courseCertifications} />
        </section>
      )}
    </div>
  );
}
