"use-client";

import { AppBar } from "@mui/material";
import Link from "next/link";
import React from "react";
import MenuDesktop from "../menu/MenuDesktop";

const Header = () => {
    return (
        <AppBar position="fixed" color="inherit" className="hidden sm:grid grid-cols-main bg-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm shadow-slate-300 dark:shadow-slate-900">
            <MenuDesktop />
        </AppBar>
    );
};

export default Header;
