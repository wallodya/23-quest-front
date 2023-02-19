"use-client";

import Link from "next/link";
import React from "react";
import MenuDesktop from "../menu/MenuDesktop";

const Header = () => {
    return (
        <header className="grid grid-cols-main bg-red-300">
            <MenuDesktop />
        </header>
    );
};

export default Header;
