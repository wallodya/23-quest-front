import { AppBar } from "@mui/material";
import { ReactNode } from "react";
import HeaderDesktop from "../nav/header/HeaderDesktop";
import HeaderMobile from "../nav/header/HeaderMobile";
import MenuMobile from "../nav/menu/MenuMobile";

const GlobalLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <HeaderDesktop />
            <HeaderMobile />
            <div className="min-h-screen grid grid-cols-main content-center">
                <main className="col-start-2 flex flex-col justify-between gap-4">
                        {children}
                </main>
            </div>
            <MenuMobile />
        </>
    );
};

export default GlobalLayout;
