"use client"

import DialMobile from "components/nav/etc/DialMobile";
import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";
import HeaderDesktop from "../nav/header/HeaderDesktop";
import HeaderMobile from "../nav/header/HeaderMobile";

const GlobalLayout = ({ children }: { children: ReactNode }) => {
    const { isSignedIn } = useAppSelector(state => state.user)

    return (
        <>
            <HeaderDesktop />
            <HeaderMobile />
            <div className="grid min-h-screen grid-cols-main items-stretch">
                <main className="relative col-start-2 flex h-full w-full flex-col justify-between gap-4 self-start mt-16">
                    {children}
                </main>
            </div>
            {isSignedIn && (
                    <DialMobile />
            )}
        </>
    );
};

export default GlobalLayout;
