import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

const GlobalLayout = ({ children } : { children: ReactNode}) => {
    return (
        <div>

            <main>
                {children}
            </main>
            <footer>Footer</footer>
        </div>
    );
};

export default GlobalLayout;
