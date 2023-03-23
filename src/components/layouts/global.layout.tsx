"use client"

import { ReactNode, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import DialMobile from "components/nav/etc/DialMobile";
import HeaderDesktop from "../nav/header/HeaderDesktop";
import HeaderMobile from "../nav/header/HeaderMobile";
import MenuMobile from "components/nav/menu/MenuMobile";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

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
            {/* {isSignedIn && <MenuMobile />} */}
            {isSignedIn && (
                    <DialMobile />
            )}
            {/* <button className="fixed bottom-24 right-24 px-3 py-2 rounded-lg" onClick={toggleSquare}>toggle</button> */}
        </>
    );
};

export default GlobalLayout;
