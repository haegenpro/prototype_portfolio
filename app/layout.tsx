import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Haegen Quinston | CS Student & Developer",
  description:
    "Portfolio of Haegen Quinston — Computer Science student at ITB, aspiring data scientist, and frontend developer. View projects, experience, and skills.",
  openGraph: {
    title: "Haegen Quinston | CS Student & Developer",
    description:
      "Computer Science student at ITB. Projects in web development, data science, and algorithms.",
    siteName: "Haegen Quinston",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Haegen Quinston Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haegen Quinston | CS Student & Developer",
    description:
      "Computer Science student at ITB. Projects in web development, data science, and algorithms.",
    images: ["/og-image.png"],
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
      className={`${spaceGrotesk.variable} ${inter.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Haegen Quinston",
              jobTitle: "Computer Science Student",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Institut Teknologi Bandung",
              },
              sameAs: [
                "https://github.com/haegenpro",
                "https://linkedin.com/in/haegenquinston/",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
