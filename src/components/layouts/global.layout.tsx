import { AppBar } from "@mui/material";
import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";
import DialMobile from "components/nav/etc/DialMobile";
import HeaderDesktop from "../nav/header/HeaderDesktop";
import HeaderMobile from "../nav/header/HeaderMobile";
import MenuMobile from "components/nav/menu/MenuMobile";

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
            {/* {isSignedIn && <MenuMobile />} */}
            {isSignedIn && <DialMobile />}
        </>
    );
};

export default GlobalLayout;
