import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

import { siteConfig } from "@/config/site";

const links = [
  { href: siteConfig.socials.github, label: "GitHub", icon: Github },
  { href: siteConfig.socials.twitter, label: "Twitter", icon: Twitter },
  { href: siteConfig.socials.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: `mailto:${siteConfig.socials.email}`, label: "Email", icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.author}
        </p>
        <div className="flex items-center gap-4">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              <Icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
