import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { NavBar } from "@/components/nav-bar";
import "./globals.css";

const geistSans = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pdpagdatoon.vercel.app"),
  title: "Patrick David Pagdatoon | IT Student & Web Developer — NJIT",
  description:
    "Portfolio of Patrick David Pagdatoon — IT student at NJIT specializing in " +
    "full-stack web applications, UX design, and practical software delivery. " +
    "Based in Newark, NJ. Available for internships.",
  keywords: [
    "Patrick Pagdatoon",
    "NJIT",
    "web developer",
    "full-stack",
    "IT student",
    "UX design",
    "Next.js",
    "React",
    "Angular",
    "Newark NJ",
  ],
  authors: [{ name: "Patrick David Pagdatoon" }],
  creator: "Patrick David Pagdatoon",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pdpagdatoon.vercel.app",
    siteName: "Patrick David Pagdatoon — Portfolio",
    title: "Patrick David Pagdatoon | Full-Stack Developer & NJIT IT Student",
    description:
      "I build web applications grounded in user needs. " +
      "Currently open to internships — May 2027 graduation.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Patrick David Pagdatoon — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patrick David Pagdatoon | Web Developer",
    description: "IT student at NJIT. Full-stack, UX, and practical delivery.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[var(--color-accent-1)] focus:px-4 focus:py-2 focus:text-[var(--color-ink)]"
        >
          Skip to content
        </a>
        <NavBar />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Patrick David Pagdatoon",
                url: "https://pdpagdatoon.vercel.app",
                email: "pdpagdatoon@gmail.com",
                jobTitle: "Information Technology Student",
                affiliation: {
                  "@type": "CollegeOrUniversity",
                  name: "New Jersey Institute of Technology",
                },
                sameAs: [
                  "https://linkedin.com/in/patrick-david-pagdatoon",
                  "https://github.com/pdpagdatoon",
                ],
              },
            ).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
