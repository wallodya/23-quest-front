import React, { ReactNode } from "react";
import GlobalLayout from "../components/layouts/global.layout";
import "../styles/globals.css"

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html>
            <body className="bg-violet-400">
                <GlobalLayout>{children}</GlobalLayout>
            </body>
        </html>
    )
};

export default RootLayout;
