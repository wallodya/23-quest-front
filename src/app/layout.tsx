import React, { ReactNode } from "react";
import GlobalLayout from "../components/layouts/global.layout";
import MainProvider from "../context/MainProvider";
import "../styles/globals.css"
import { Inter } from "@next/font/google"

const inter = Inter({
    variable: "--font-inter",
    display: "swap",
    subsets: ["latin-ext", "latin"],
})

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en" className={`${inter.variable}`}>
            <body className="text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800">
                <MainProvider>
                    <GlobalLayout>{children}</GlobalLayout>
                </MainProvider>
            </body>
        </html>
    )
};

export default RootLayout;
