"use client";

import { Inter, Rakkas } from "next/font/google";
import { ReactNode } from "react";
import GlobalLayout from "../components/layouts/global.layout";
import MainProvider from "../context/MainProvider";
import "../styles/globals.css";

const inter = Inter({
    variable: "--font-inter",
    display: "swap",
    subsets: ["latin-ext", "latin"],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html
            lang="en"
            className={`${inter.variable} dark`}
        >
            <body className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                <MainProvider>
                    <GlobalLayout>{children}</GlobalLayout>
                </MainProvider>
            </body>
        </html>
    );
};

export default RootLayout;
