import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mayer Law | Resourcefully Relentless Representation",
  description:
    "Mayer Law, led by Attorney Nicole Mayer in Maitland, Florida. Specializing in Consumer Finance Law, Education Law & Civil Rights, Personal Injury, and General Litigation. Through individual action, or class action, WE TAKE ACTION.",
  keywords: [
    "Mayer Law",
    "Nicole Mayer",
    "Maitland Florida lawyer",
    "consumer finance law",
    "education law",
    "civil rights",
    "personal injury",
    "class action",
    "litigation",
    "Florida attorney",
  ],
  authors: [{ name: "Mayer Law" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Mayer Law | Resourcefully Relentless Representation",
    description:
      "Through individual action, or class action, WE TAKE ACTION. Attorney Nicole Mayer in Maitland, Florida.",
    url: "https://mayerlawflorida.com",
    siteName: "Mayer Law",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayer Law | Resourcefully Relentless Representation",
    description:
      "Through individual action, or class action, WE TAKE ACTION. Attorney Nicole Mayer in Maitland, Florida.",
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
        className={`${playfair.variable} ${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
