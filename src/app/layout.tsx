import type { Metadata } from "next";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import { getConfig } from "@/lib/data";
import "./globals.css";

const config = getConfig();

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
  openGraph: {
    title: config.site.title,
    description: config.site.description,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: config.site.title,
    description: config.site.description
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent-cyan focus:px-4 focus:py-2 focus:text-navy-950 focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
