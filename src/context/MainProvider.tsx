"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ThemeProvider } from "next-themes";

const MainProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <ThemeProvider
                themes={["dark", "light"]}
                enableSystem={false}
                defaultTheme={"dark"}
                attribute="class"
            >
                {children}
            </ThemeProvider>
        </Provider>
    );
};

export default MainProvider;
