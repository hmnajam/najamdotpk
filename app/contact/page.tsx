import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description={
          <>
            Have a project or question? Send a message, or email me directly at{" "}
            <Link
              href={`mailto:${siteConfig.socials.email}`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {siteConfig.socials.email}
            </Link>
            .
          </>
        }
      />

      <ContactForm />
    </div>
  );
}
