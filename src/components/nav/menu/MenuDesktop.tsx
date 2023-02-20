"use client";

import Link from "next/link";
import React from "react";
import { useTheme } from "../../../context/theme/theme.hooks";

const MenuDesktop = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <nav className="col-start-2 grid grid-cols-2 py-4 items-stretch">
            <div className="px-4 flex gap-4">
                <span>Logo</span>
                <span onClick={toggleTheme}>{isDark ? "Light" : "Dark"}</span>
            </div>
            <ul className="flex justify-around text-sm font-semibold">
                <li className="pr-4 text-bold flex items-center hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                    <Link href="/home">Home</Link>
                </li>
                <li className="px-4 text-bold flex items-center hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                    <Link href="/quests">Quests</Link>
                </li>
                <li className="px-4 text-bold flex items-center hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                    <Link href="/new">New</Link>
                </li>
                <li className="pl-4 text-bold flex items-center hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                    <Link href="/settings">Settings</Link>
                </li>
            </ul>
        </nav>
    );
};

export default MenuDesktop;
