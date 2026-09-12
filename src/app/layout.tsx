import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Andrew Chau";
const description =
  "Backend and data engineer building pipelines and real-time systems, plus icebreaker games on the side.";
const url = "https://chauandrew.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  keywords: [
    "Andrew Chau",
    "backend engineer",
    "data engineer",
    "software engineer",
    "Snowflake",
    "Airflow",
    "Kafka",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "AtI-dEcZhDILaY5LnU3n-ylOZUYI_A5aAgXKMHRPiGQ",
  },
  openGraph: {
    title,
    description,
    url,
    siteName: title,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: title,
              url,
              jobTitle: "Backend and Data Engineer",
              sameAs: [
                "https://github.com/chauandrew",
                "https://www.linkedin.com/in/chau-andrew/",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
