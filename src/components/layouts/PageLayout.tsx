"use client"

import { DesktopHeader, MobileHeader } from "components/nav";
import DialMobile from "components/nav/etc/DialMobile";
import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../store/hooks";
import ToastPortal from "./ToastPortal";

const GlobalLayout = ({ children }: { children: ReactNode }) => {
    const { isSignedIn } = useAppSelector(state => state.user)

    return (
        <>
            <MobileHeader />
            <DesktopHeader />
            <div className="grid min-h-screen grid-cols-main items-stretch">
                <main className="relative col-start-2 h-full w-full gap-4 self-start">
                    {children}
                    <ToastPortal/>
                </main>
            </div>
            {isSignedIn && <DialMobile />}
        </>
    );
};

export default GlobalLayout;
