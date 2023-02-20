"use client"

import { createContext, ReactNode, useEffect, useState } from "react";
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

    if (!isThemeSet) {
        setIsDark(isInitialThemeDark());
        setIsThemeSet(true);
    }

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
