"use client"

import { THEME_NAMES } from "./theme.const";
import "client-only";

export const setDocumentTheme = (isDark: boolean): void => {
    if (typeof document === "undefined") {
        console.log("setDocumentTheme: document is not defined")
        return
    }

    if (isDark) {
        document.documentElement.setAttribute('data-theme', THEME_NAMES.DARK)
        document.documentElement.classList.add(THEME_NAMES.DARK)
        localStorage.theme = THEME_NAMES.DARK
    } else {
        document.documentElement.setAttribute('data-theme', THEME_NAMES.LIGHT)
        document.documentElement.classList.remove(THEME_NAMES.DARK)
        localStorage.theme = THEME_NAMES.LIGHT
    }
}

export const isInitialThemeDark = (): boolean => {

    if (typeof document === "undefined") {
        console.log("isInitialTheme: document is not defined")
        return false
    }

    const isDocumentThemeDark =
        document.documentElement.getAttribute("data-theme") ===
        THEME_NAMES.DARK;

    const isLocalStorageThemeSet = !!localStorage.theme
    const isLocalStoragethemeDark = localStorage.theme === THEME_NAMES.DARK;

    const isPreferenceDark =
        window.matchMedia &&
        window.matchMedia(`(prefers-color-scheme: ${THEME_NAMES.DARK})`).matches;

    const isThemeDark =
        isDocumentThemeDark ||
        isLocalStoragethemeDark ||
        (isPreferenceDark && !isLocalStorageThemeSet);

    console.log("is initial theme dark: ", isThemeDark)
    return isThemeDark;
};
