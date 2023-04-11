import React, { ReactNode } from "react";

const TopBar = ({ children, isMobile }: { children: ReactNode, isMobile: boolean }) => {
    return (
        <div
            className={`${
                isMobile ? "grid sm:hidden" : "hidden sm:grid"
            } fixed w-full z-39 grid-cols-main bg-slate-100 bg-none py-4 text-slate-800 shadow-sm shadow-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:shadow-slate-900`}
        >
            {children}
        </div>
    );
};

export default TopBar;
