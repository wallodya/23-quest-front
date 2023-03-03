"use client";

import Link from "next/link";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar } from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { dark } from "@mui/material/styles/createPalette";
import { LogoutRounded, MenuRounded, Person, PersonRounded } from "@mui/icons-material";
import NavBarDesktop from "./NavBarDesktop";
import NavBarDesktopGuest from "./NavBarDesktopGuest";
import { useAppSelector } from "../../../store/hooks";

const MenuDesktop = () => {
    const { isSignedIn } = useAppSelector((state) => state.user);

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
        <Toolbar className="col-start-2 grid grid-cols-3 items-stretch">
            <div className="flex gap-4">
                <div className="flex flex-col justify-center">
                    <span>Logo</span>
                </div>
                {/* <span onClick={toggleTheme} className="cursor-pointer">{themeLabel}</span> */}
            </div>
            {isSignedIn ? <NavBarDesktop /> : <NavBarDesktopGuest />}
        </Toolbar>
    );
};

export default MenuDesktop;
