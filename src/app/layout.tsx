import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

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

export const viewport: Viewport = {
  themeColor: "#C9A96E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Mayer Law | Resourcefully Relentless Representation",
  description:
    "Mayer Law, led by Attorney Nicole Mayer in Maitland, Florida. Specializing in Consumer Finance Law, Education Law & Civil Rights, Personal Injury, and General Litigation.",
  keywords: [
    "Mayer Law",
    "Nicole Mayer",
    "Maitland Florida lawyer",
    "consumer finance law",
    "education law",
    "civil rights",
    "personal injury",
    "litigation",
    "Florida attorney",
  ],
  authors: [{ name: "Mayer Law" }],
  icons: {
    icon: "/mayer-assets/favicon.png",
    apple: "/mayer-assets/favicon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Mayer Law | Resourcefully Relentless Representation",
    description:
      "Through individual action, or class action, WE TAKE ACTION. Attorney Nicole Mayer in Maitland, Florida.",
    siteName: "Mayer Law",
    type: "website",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mayer Law",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#FEFCF9",
              border: "1px solid #F5EDE0",
              color: "#2D2D2D",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
