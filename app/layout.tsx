import type { Metadata } from "next";
import { Inter, DM_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";
import AppToaster from "./components/AppToaster";
import { siteUrl } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const SITE = siteUrl()

export const metadata: Metadata = {
  title: {
    default: 'CrossResearch - Institutional-Grade Market Intelligence',
    template: '%s | CrossResearch',
  },
  description: 'Access proprietary algorithms, macro intelligence, and market regime tools trusted by advanced traders worldwide.',
  authors: [{ name: 'CrossResearch', url: SITE }],
  creator: 'CrossResearch',
  publisher: 'CrossResearch',
  robots: { index: true, follow: true },
  metadataBase: new URL(SITE),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${urbanist.variable} antialiased`}
    >
      <body>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <AppToaster />
      </body>
    </html>
  );
}
