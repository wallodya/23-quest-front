"use-client";

import Link from "next/link";
import React from "react";
import MenuDesktop from "../menu/MenuDesktop";

const Header = () => {
    return (
        <header className="grid grid-cols-main bg-slate-100 dark:bg-slate-800 shadow-sm shadow-slate-300 dark:shadow-slate-900 ">
            <MenuDesktop />
        </header>
    );
};

export default Header;
