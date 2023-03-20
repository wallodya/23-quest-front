"use-client";

import Link from "next/link";
import React from "react";
import MenuDesktop from "../menu/MenuDesktop";

const Header = () => {
    return (
        <div className="hidden sm:grid grid-cols-main bg-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm shadow-slate-300 dark:shadow-slate-900">        
            <MenuDesktop />
        </div>


    );
};

export default Header;
