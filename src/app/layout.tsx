"use client";

import React, { ReactNode, useState } from "react";
import GlobalLayout from "../components/layouts/global.layout";
import MainProvider from "../context/MainProvider";
import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
    variable: "--font-inter",
    display: "swap",
    subsets: ["latin-ext", "latin"],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
    // const [themeNameName, setthemeNameName] = useState<string>("dark");

    return (
        <html
            lang="en"
            className={`${inter.variable} dark`}
            // style={{ colorScheme: themeNameName }}
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
