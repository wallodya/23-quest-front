import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({
    variable: "--font-inter",
    display: "swap",
    subsets: ["latin-ext", "latin"],
    preload: true,
});

const PageWrapper = ({children}:{children: ReactNode}) => {
    return (
        <html lang="en" className={`${inter.variable} dark font-sans`}>
            <body className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                {children}
            </body>
        </html>
    );
}

export default PageWrapper