"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Toolbar } from "@mui/material";

const MenuDesktop = () => {
    const { theme, setTheme } = useTheme();
    const [themeLabel, setThemeLabel] = useState<"Light" | "Dark">("Light");

    // const toggleTheme = () => {
    //     if (theme === "undefined" || typeof window === "undefined") {
    //         console.log("theme is undefined")
    //         return
    //     }
    //     setTheme(
    //         theme === "dark"
    //             ? "light"
    //             : "dark"
    //     )
    // }

    // useEffect(() => {
    //     setThemeLabel(theme === "dark" ? "Light" : "Dark")
    // }, [theme])

    return (
        <Toolbar className="col-start-2 grid grid-cols-2 items-stretch py-4">
            <div className="flex gap-4 px-4">
                <span>Logo</span>
                {/* <span onClick={toggleTheme} className="cursor-pointer">{themeLabel}</span> */}
            </div>
            <ul className="flex justify-around text-sm font-semibold">
                <li className="text-bold flex items-center pr-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                    <Link href="/home">Home</Link>
                </li>
                <li className="text-bold flex items-center px-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                    <Link href="/quests">Quests</Link>
                </li>
                <li className="text-bold flex items-center px-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                    <Link href="/new">New</Link>
                </li>
                <li className="text-bold flex items-center pl-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                    <Link href="/settings">Settings</Link>
                </li>
            </ul>
        </Toolbar>
    );
};

export default MenuDesktop;
