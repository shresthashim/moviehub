import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";
import Providers from "./Providers";
import React from "react";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'MovieHub',
    description: 'A movie database created by Next.js',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    // @ts-ignore
    return (
        <html lang="en">
        <body className={inter.className}>
        <Providers>
            <Header/>
            <Navbar/>
            <SearchBox/>

            {children}
        </Providers>


        </body>
        </html>
    )
}
