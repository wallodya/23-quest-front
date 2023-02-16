import Link from "next/link";
import React, { ReactElement, ReactNode } from "react";

const Layout = ({ children } : { children: ReactNode}) => {
    return (
        <div>
            <header>
                <ul>
                    <li className="text-bold text-sky-900">
                        <Link href="/home">Home</Link>
                    </li>
                    <li className="text-bold text-sky-">
                        <Link href="/sign_in">Sign in</Link>
                    </li>
                </ul>
            </header>
            <main>
                {children}
            </main>
            <footer>Footer</footer>
        </div>
    );
};

export default Layout;
