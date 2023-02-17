import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";
import Header from "../nav/header/Header";

const GlobalLayout = ({ children } : { children: ReactNode}) => {
    return (
        <div>
            <Header/>
            <main>
                {children}
            </main>
            <footer>Footer</footer>
        </div>
    );
};

export default GlobalLayout;
