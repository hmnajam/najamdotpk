import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Fixed cinematic backdrop — ambient glows + subtle grid on every page. */}
          <div
            aria-hidden="true"
            className="ambient-glow pointer-events-none fixed inset-0 -z-20"
          />
          <div
            aria-hidden="true"
            className="bg-grid pointer-events-none fixed inset-0 -z-20 opacity-60 [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
          />
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-[1600px] flex-1 px-5 py-12 sm:px-8 lg:px-14 lg:py-16 xl:px-20">
              {children}
            </main>
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
