"use-client";

import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <header className="grid grid-cols-main bg-red-300">
            <ul className="col-start-2 bg-red-400">
                <li className="text-bold text-sky-900">
                    <Link href="/home">Home</Link>
                </li>
                <li className="text-bold text-sky-900">
                    <Link href="/sign-in">Sign in</Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;
