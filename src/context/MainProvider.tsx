"use client";

import React, { Dispatch, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ThemeProvider } from "next-themes";
import { MUIThemeProvider } from "./mui/mui.context";
import { CssBaseline } from "@mui/material";

const MainProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            {/* <ThemeProvider
                themes={["dark", "light"]}
                enableSystem={false}
                defaultTheme={"dark"}
                attribute="class"
            > */}
                <MUIThemeProvider>
                    {/* <CssBaseline /> */}
                    {children}
                </MUIThemeProvider>
            {/* </ThemeProvider> */}
        </Provider>
    );
};

export default MainProvider;
