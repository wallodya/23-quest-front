"use client";

import { ThemeProvider } from "@mui/system";
import { createTheme, Theme, ThemeOptions } from "@mui/material";
import { useTheme } from "next-themes";
import { Dispatch, ReactNode, useEffect, useMemo, useState } from "react";
import { red } from "@mui/material/colors";

const baseTheme: ThemeOptions = {};
const darkTheme: ThemeOptions = {
    palette: {
        mode: "dark",
        primary: {
            light: '#0ea5e9',
            main: '#38bdf8',
            dark: '#38bdf8',
            contrastText: '#f1f5f9',
        },
        background: {
            paper: "#38bdf8", 
            default: "#38bdf8" 
        }
        // secondary: {
        //     light: '#0ea5e9',
        //     main: '#3f50b5',
        //     dark: '#38bdf8',
        //     contrastText: '#f1f5f9',
        // },
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
