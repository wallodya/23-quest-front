"use client"

import DialMobile from "components/nav/etc/DialMobile";
import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";
import { MobileHeader, DesktopHeader} from "components/nav"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastClasses = {
    success: "bg-green-700 outline-green-600",
    error: "bg-red-800 outline-red-700",
    info: "bg-gray-600 outline-gray-500",
    warning: "bg-orange-600 outline-orange-500",
    default: "bg-slate-900 outline-slate-700",
    dark: "bg-slate-900 font-gray-300",
};

const toastProgressbarClasses = {
    success: "bg-green-600/70",
    error: "bg-red-700/70",
    info: "bg-gray-500/70",
    warning: "bg-orange-500/70",
    default: "bg-slate-700/70",
    dark: "",
}

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
                        className={
                            "left-auto right-2 bottom-4 flex w-72 flex-col gap-2 text-slate-100"
                        }
                        toastClassName={(opt) =>
                            toastClasses[opt?.type || "default"] +
                            " relative flex p-1 min-h-max justify-between overflow-hidden cursor-pointer rounded-lg outline"
                        }
                        progressClassName={(opt) =>
                            toastProgressbarClasses[opt?.type || "default"] +
                            " absolute bottom-0 left-0 w-full h-1.5 z-[9999] origin-left Toastify__progress-bar--animated"
                        }
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        limit={3}
                        theme="dark"
                    />
                </main>
            </div>
            {isSignedIn && <DialMobile />}
        </>
    );
};

export default GlobalLayout;
