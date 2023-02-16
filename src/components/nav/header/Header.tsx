import Link from "next/link";
import React from "react";

const Header = () => {
    return (
        <header>
            <ul>
                <li className="text-bold text-sky-900">
                    <Link href="/home">Home</Link>
                </li>
                <li className="text-bold text-sky-900">
                    <Link href="/sign_in">Sign in</Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;
