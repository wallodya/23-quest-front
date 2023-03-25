"use client"

import DialMobile from "components/nav/etc/DialMobile";
import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";
import { MobileHeader, DesktopHeader} from "components/nav"

const GlobalLayout = ({ children }: { children: ReactNode }) => {
    const { isSignedIn } = useAppSelector(state => state.user)

    return (
        <>
            <MobileHeader />
            <DesktopHeader />
            <div className="grid min-h-screen grid-cols-main items-stretch">
                <main className="relative col-start-2 h-full w-full gap-4 self-start">
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
