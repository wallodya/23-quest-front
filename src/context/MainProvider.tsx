"use client";

import React, { Dispatch, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ThemeProvider } from "next-themes";
import InitUser from "../components/misc/InitUser";
import { Analytics } from "@vercel/analytics/react";

const MainProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
            <InitUser />
            <Analytics />
        </Provider>
    );
};

export default MainProvider;
