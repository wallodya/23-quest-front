"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { THEME_NAMES } from "./theme.const";
import { isInitialThemeDark, setDocumentTheme } from "./theme.utils";

type ThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
};

const NullTheme = {
    isDark: true,
    toggleTheme: () => {},
};

export const ThemeContex = createContext<ThemeContextType>(NullTheme);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState<boolean>(true);
    const [isThemeSet, setIsThemeSet] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        console.log('isMounted effect', isMounted)
        // return () => {
        //     setIsMounted(false);
        // };
    }, []);

    useEffect(() => {
        if (!isThemeSet && isMounted) {
            // setIsDark(isInitialThemeDark());
            // setIsThemeSet(true);
            console.log('isMounted', isMounted)
            const isDocumentThemeDark =
                document.documentElement.getAttribute("data-theme") ===
                THEME_NAMES.DARK;

            const isLocalStorageThemeSet = !!localStorage.theme;
            const isLocalStoragethemeDark =
                localStorage.theme === THEME_NAMES.DARK;

            const isPreferenceDark =
                window.matchMedia &&
                window.matchMedia(`(prefers-color-scheme: ${THEME_NAMES.DARK})`)
                    .matches;

            const isThemeDark =
                isDocumentThemeDark ||
                isLocalStoragethemeDark ||
                (isPreferenceDark && !isLocalStorageThemeSet);

            console.log("is initial theme dark: ", isThemeDark);

            setIsDark(isThemeDark);
            setIsThemeSet(true);
        }
    }, [isMounted]);

    useEffect(() => {
        setDocumentTheme(!!isDark);
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const themeContextValue = {
        isDark,
        toggleTheme,
    };

    return (
        <ThemeContex.Provider value={themeContextValue}>
            {children}
        </ThemeContex.Provider>
    );
};

export default ThemeProvider;
