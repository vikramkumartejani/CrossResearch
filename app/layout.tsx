import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./components/ConditionalLayout";

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

export const metadata: Metadata = {
  title: {
    default: 'CrossResearch - Institutional-Grade Market Intelligence',
    template: '%s | CrossResearch',
  },
  description: 'Access proprietary algorithms, macro intelligence, and market regime tools trusted by advanced traders worldwide.',
  authors: [{ name: 'CrossResearch', url: 'https://cross-research.vercel.app' }],
  creator: 'CrossResearch',
  publisher: 'CrossResearch',
  robots: { index: true, follow: true },
  metadataBase: new URL('https://cross-research.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} antialiased`}
    >
      <body>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
