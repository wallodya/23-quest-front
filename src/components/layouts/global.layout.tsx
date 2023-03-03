import { AppBar } from "@mui/material";
import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";
import HeaderDesktop from "../nav/header/HeaderDesktop";
import HeaderMobile from "../nav/header/HeaderMobile";
import MenuMobile from "../nav/menu/MenuMobile";

const GlobalLayout = ({ children }: { children: ReactNode }) => {
    const { isSignedIn } = useAppSelector(state => state.user)
    return (
        <>
            <HeaderDesktop />
            <HeaderMobile />
            <div className="min-h-screen grid grid-cols-main content-center">
                <main className="col-start-2 flex flex-col justify-between gap-4">
                        {children}
                </main>
            </div>
            {isSignedIn && <MenuMobile />}
        </>
    );
};

export default GlobalLayout;
