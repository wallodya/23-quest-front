import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import GradingRoundedIcon from '@mui/icons-material/GradingRounded';
import { AppBar } from "@mui/material";
import Link from "next/link";
import React from "react";

const MenuMobile = () => {
    return (
        <AppBar position="fixed" sx={{bottom: 0, top: "auto"}} className="sm:hidden py-2 bg-none bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm shadow-slate-300 dark:shadow-slate-900">
            <nav className="grid grid-cols-main py-2">
                <ul className="col-start-2 flex justify-around">
                    <li className="text-bold">
                        <HomeRoundedIcon/>
                        <Link href="/home">Home</Link>
                    </li>
                    <li className="text-bold">
                        <GradingRoundedIcon/>
                        <Link href="/quests">Quests</Link>
                    </li>
                    <li className="text-bold">
                        <AddCircleRoundedIcon/>
                        <Link href="/new">New</Link>
                    </li>
                    <li className="text-bold">
                        <SettingsRoundedIcon/>
                        <Link href="/settings">Settings</Link>
                    </li>
                </ul>
            </nav>
        </AppBar>
    );
};

export default MenuMobile;
