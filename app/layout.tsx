import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ardy-ai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "أرضي | ARDY-AI — Active Microwave Sensing for Precision Agriculture",
  description:
    "Egypt's first scalable active microwave remote sensing and IoT telemetry system for Nile water conservation and precision agriculture. Department of Electrical Communications and Electronics Engineering, Al-Azhar University.",
  keywords: [
    "ARDY-AI",
    "أرضي",
    "AlMonther Abdulhafeez",
    "SAR",
    "Synthetic Aperture Radar",
    "Precision Agriculture",
    "Sentinel-1",
    "Soil Moisture",
    "Egypt",
    "Water Cloud Model",
    "Nile Water Optimization",
    "IoT Telemetry",
    "Al-Azhar University",
  ],
  icons: {
    icon: "/ardy-logo.png",
    apple: "/ardy-logo.png",
  },
  openGraph: {
    title: "ARDY-AI (أرضي) — Active Microwave Sensing for Agriculture",
    description:
      "Engineering Egypt's first platform fusing Copernicus Sentinel-1 SAR data with localized IoT telemetry. Al-Azhar University ECE.",
    url: siteUrl,
    siteName: "ARDY-AI (أرضي)",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ARDY-AI (أرضي) — Active Microwave Sensing for Precision Agriculture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARDY-AI (أرضي) — Active Microwave Sensing for Agriculture",
    description:
      "Engineering Egypt's first platform fusing Copernicus Sentinel-1 SAR data with localized IoT telemetry.",
    images: ["/og-image.jpg"],
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
      className={`${inter.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-cream text-pine selection:bg-lime selection:text-pine">
        {children}
      </body>
    </html>
  );
}
