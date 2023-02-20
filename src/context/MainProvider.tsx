"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import ThemeProvider from "./theme/theme.provider";

const MainProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <ThemeProvider>{children}</ThemeProvider>
        </Provider>
    );
};

export default MainProvider;
