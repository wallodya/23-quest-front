"use client";

import LogoTemporary from "components/icons/LogoTemporary";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useAppSelector } from "store/hooks";
import NavBarDesktop from "./NavBarDesktop";
import NavBarDesktopGuest from "./NavBarDesktopGuest";
import Link from "next/link";

export const MenuDesktop = () => {
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
        <div className="col-start-2 grid grid-cols-3 items-stretch">
            <div className="flex gap-4">
                <Link href="/" className="flex flex-col justify-center">
                    <LogoTemporary />
                </Link>
                {/* <span onClick={toggleTheme} className="cursor-pointer">{themeLabel}</span> */}
            </div>
            {isSignedIn ? <NavBarDesktop /> : <NavBarDesktopGuest />}
        </div>
    );
};
