import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Roboto } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { cn } from "@app/lib/utils";

const interHeading = Roboto({
  weight: ["400", "500", "700"], // 👈 Added weight array
  subsets: ["latin"],
  variable: "--font-sans",
});
const roboto = Roboto({
  weight: ["400", "500", "700"], // 👈 Added weight array
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chitit – Smart Chit Fund Management & Tracker App",
  description:
    "Simplify and manage your chit fund groups with Chitit. Effortlessly track payments, auction histories, payouts, and monthly contributions in one secure app.",
  keywords: [
    "Chit fund management",
    "Chit fund tracker app",
    "Chitit app",
    "ROSCA app",
    "Savings group manager",
    "Auction tracker chit fund",
    "Digital chit fund",
  ],
  authors: [{ name: "Rithick" }],
  creator: "abqdevlabs",
  publisher: "abqdevlabs",
  openGraph: {
    title: "Chitit – Smart Chit Fund Management App",
    description:
      "Seamlessly manage chit funds, track monthly contributions, and monitor payout auctions on the go.",
    siteName: "Chitit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chitit – Smart Chit Fund Management App",
    description:
      "Track chit funds, payouts, and member contributions easily with Chitit.",
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
      lang="ta"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        "font-sans",
        roboto.variable,
        interHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
