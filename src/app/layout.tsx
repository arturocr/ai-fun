import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/header";
import Providers from "@/components/providers";

import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "dressassistant.ai",
  description: "Weather-Based Clothing Recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
