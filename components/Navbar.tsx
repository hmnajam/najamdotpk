import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define the array of links
const links = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  // Add more links as needed
];

// Your main component where you use NavLinks

export default function Navbar() {
  return (
    <nav className="bg-[#2c0346] text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link className="font-bold text-lg" href="/">
            Logo
          </Link>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-blue-300"
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/Resume.pdf"
            download
            className="bg-[#ff914d]  text-white mx-2 p-2 rounded-md hover:bg-sky-100 hover:text-blue-600"
          >
            Resume
          </Link>
          <Link href="/hire-me">
            <Button className="bg-[#ff914d] text-white">Hire Me</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
