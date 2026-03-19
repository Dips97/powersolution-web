import type { Metadata } from "next";
import { Literata } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://powersolution.dev"),
  title: {
    default: "Power Solution — Microsoft 365, Power Platform & SharePoint Blog",
    template: "%s | Power Solution",
  },
  description:
    "Expert guides on Power Apps, Power Automate, SharePoint, and AI — written by a Digital Transform Enthusiast. Tutorials, how-tos, and real-world solutions.",
  keywords: [
    "Power Apps",
    "Power Automate",
    "SharePoint",
    "Microsoft 365",
    "Power Platform",
    "Copilot Studio",
    "SPFx",
    "TypeScript",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://powersolution.dev",
    siteName: "Power Solution",
    title: "Power Solution — Microsoft 365, Power Platform & SharePoint Blog",
    description:
      "Expert guides on Power Apps, Power Automate, SharePoint, and AI — written by a Digital Transform Enthusiast.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Power Solution" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Power Solution — Microsoft 365, Power Platform & SharePoint Blog",
    description: "Expert guides on Power Apps, Power Automate, SharePoint, and AI.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://powersolution.dev" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Power Solution",
  url: "https://powersolution.dev",
  description:
    "Expert guides on Power Apps, Power Automate, SharePoint, and AI written by Dipak Shaw.",
  author: {
    "@type": "Person",
    name: "Dipak Shaw",
    url: "https://powersolution.dev/about",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://powersolution.dev/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={literata.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
