"use client"

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import GradingRoundedIcon from '@mui/icons-material/GradingRounded';
import { AppBar } from "@mui/material";
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation';

const MenuMobile = () => {
    const pathname = usePathname().split("/")[1]

    return (
        <AppBar
            position="fixed"
            sx={{ bottom: 0, top: "auto" }}
            className="bg-slate-100 bg-none py-2 text-slate-800 shadow-sm shadow-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:shadow-slate-900 sm:hidden"
        >
            <div className="grid grid-cols-main py-2">
                <nav className="col-start-2 flex justify-around">
                    <Link
                        href="home"
                        className={`flex flex-col items-center justify-between gap-2 text-xs font-bold ${
                            pathname === "home" && "text-sky-500"
                        }`}
                    >
                        <HomeRoundedIcon color="inherit" fontSize="medium" />
                        Home
                    </Link>
                    <Link
                        href={"/quests"}
                        className={`flex flex-col items-center justify-between gap-2 text-xs font-bold ${
                            pathname === "quests" && "text-sky-500"
                        }`}
                    >
                        <GradingRoundedIcon color="inherit" fontSize="medium" />
                        Quests
                    </Link>
                    <Link
                        href={"/new"}
                        className={`flex flex-col items-center justify-between gap-2 text-xs font-bold ${
                            (pathname === "new" ||
                                pathname === "new-quest" ||
                                pathname === "new-task") &&
                            "text-sky-500"
                        }`}
                    >
                        <AddCircleRoundedIcon
                            color="inherit"
                            fontSize="medium"
                        />
                        New
                    </Link>
                    <Link
                        href={"/settings"}
                        className={`flex flex-col items-center justify-between gap-2 text-xs font-bold ${
                            pathname === "settings" && "text-sky-500"
                        }`}
                    >
                        <SettingsRoundedIcon
                            color="inherit"
                            fontSize="medium"
                        />
                        Settings
                    </Link>
                </nav>
            </div>
        </AppBar>
    );
};

export default MenuMobile;
