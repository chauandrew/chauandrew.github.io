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
  "Backend, data, and full-stack engineer building pipelines and real-time systems, plus icebreaker games on the side.";
const url = "https://chauandrew.github.io";

export const metadata: Metadata = {
  title,
  description,
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
