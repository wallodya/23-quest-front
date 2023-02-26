"use client";

import { ThemeProvider } from "@mui/system";
import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { useTheme } from "next-themes";
import { Dispatch, ReactNode, useEffect, useMemo, useState } from "react";

const baseTheme: ThemeOptions = {};
const darkTheme: ThemeOptions = {
    palette: {
        mode: "dark",
    },
};
const lightTheme: ThemeOptions = {
    palette: {
        mode: "light",
    },
};

export const MUIThemeProvider = ({ children }: { children: ReactNode }) => {
    // const { theme } = useTheme();
    const [muiTheme, setMuiTheme] = useState<Theme>(
        createTheme({ ...darkTheme, ...baseTheme }),
    );

    // useEffect(() => {
    //     console.log("Theme: ", theme);
    //     if (theme === undefined) {
    //         return;
    //     }

    //     const colorTheme = theme === "dark" ? darkTheme : lightTheme;
    //     const currentTheme = createTheme({
    //         ...colorTheme,
    //         ...baseTheme,
    //     });
    //     setMuiTheme(currentTheme);
    // }, [theme]);

    return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};
