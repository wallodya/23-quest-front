"use client";

import { Toolbar } from "@mui/material";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import NavBarDesktop from "../etc/NavBarDesktop";
import NavBarDesktopGuest from "../etc/NavBarDesktopGuest";

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
