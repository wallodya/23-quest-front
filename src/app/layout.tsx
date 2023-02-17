import React, { ReactNode } from "react";
import GlobalLayout from "../components/layouts/global.layout";

const Layout = ({ children }: { children: ReactNode }) => {
    return <GlobalLayout>{children}</GlobalLayout>;
};

export default Layout;
