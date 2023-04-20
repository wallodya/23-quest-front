"use client"

import DialMobile from "components/nav/etc/DialMobile";
import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";
import { MobileHeader, DesktopHeader} from "components/nav"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalLayout = ({ children }: { children: ReactNode }) => {
    const { isSignedIn } = useAppSelector(state => state.user)

    return (
        <>
            <MobileHeader />
            <DesktopHeader />
            <div className="grid min-h-screen grid-cols-main items-stretch">
                <main className="relative col-start-2 h-full w-full gap-4 self-start">
                    {children}
                    <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                </main>
            </div>
            {isSignedIn && (
                    <DialMobile />
            )}
        </>
    );
};

export default GlobalLayout;
