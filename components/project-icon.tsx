import {
  Bot,
  Boxes,
  FileText,
  MessageCircle,
  Phone,
  Scale,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  visawise: FileText,
  zerohr: Bot,
  rapidcontent: FileText,
  "amazon-listing-automation": ShoppingCart,
  chatify: MessageCircle,
  lawisor: Scale,
  "portfolio-site": Boxes,
};

export function ProjectIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Icon = icons[slug] ?? Boxes;
  return <Icon className={className} aria-hidden="true" />;
}
