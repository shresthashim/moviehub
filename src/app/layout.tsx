import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieHub",
  description: "A movie database created by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Providers>
            <Header />
            <Suspense fallback={<Loading />}>
              <Navbar />
            </Suspense>
            <Suspense fallback={<Loading />}>
              <SearchBox />
            </Suspense>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
