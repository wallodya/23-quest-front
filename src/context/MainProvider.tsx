"use client";

import React, { Dispatch, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ThemeProvider } from "next-themes";
import InitUser from "../components/misc/InitUser";


const MainProvider = ({ children }: { children: ReactNode }) => {
    return (
            <Provider store={store}>
                {children}
                <InitUser />

            </Provider>
    );
};

export default MainProvider;
