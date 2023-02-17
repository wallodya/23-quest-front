import React, { ReactNode } from "react";
import GlobalLayout from "../components/layouts/global.layout";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html>
            <body>
                <GlobalLayout>{children}</GlobalLayout>;
            </body>
        </html>
    )
};

export default RootLayout;
