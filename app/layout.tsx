import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingActionButton from "@/components/common/FloatingActionButton";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAA JOGOMAYA ENERGY - Solar Solutions | PM Surya Ghar Yojana",
  description: "MAA JOGOMAYA ENERGY - Leading solar energy solutions provider in Bhubaneswar, Odisha. Get government subsidy, rooftop solar installation, and save up to 90% on electricity bills.",
  keywords: "solar energy, rooftop solar, PM Surya Ghar Yojana, solar subsidy, solar installer Bhubaneswar, solar panels Odisha, renewable energy",
  authors: [{ name: "MAA JOGOMAYA ENERGY" }],
  creator: "MAA JOGOMAYA ENERGY",
  publisher: "MAA JOGOMAYA ENERGY",
  robots: "index, follow",
  openGraph: {
    title: "MAA JOGOMAYA ENERGY - Solar Solutions | PM Surya Ghar Yojana",
    description: "Get up to ₹1,38,000 government subsidy on rooftop solar installation. Reduce electricity bills by 90% with MAA JOGOMAYA ENERGY.",
    url: "https://maajogomayaenergy.com",
    siteName: "MAA JOGOMAYA ENERGY",
    images: [
      {
        url: "/images/logo/Logo.png",
        width: 512,
        height: 512,
        alt: "MAA JOGOMAYA ENERGY - Solar Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAA JOGOMAYA ENERGY - Solar Solutions",
    description: "Get government subsidy on rooftop solar installation. Save up to 90% on electricity bills.",
    images: ["/images/logo/Logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  alternates: {
    canonical: "https://maajogomayaenergy.com",
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
        <meta name="msapplication-TileColor" content="#7B3FE4" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#7B3FE4" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingActionButton />
        </body>
    </html>
  );
}