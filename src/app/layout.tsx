import React from "react";
import type { Metadata } from "next";
import { Bebas_Neue, Sora } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MovieHub — Discover films worth watching",
    template: "%s · MovieHub",
  },
  description:
    "Explore trending, top-rated, popular and now-playing films. Search the catalogue, read reviews, and build your favorites — powered by TMDB.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
        <body className="font-sans antialiased">
          <Providers>
            <div className="app-aurora grain flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
