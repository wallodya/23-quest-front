import React, { ReactNode } from "react";

const TopBar = ({ children, isMobile }: { children: ReactNode, isMobile: boolean }) => {
    return (
        <div
            className={`${
                isMobile ? "block sm:hidden" : "hidden sm:block"
            } fixed grid w-full grid-cols-main bg-slate-100 bg-none py-4 text-slate-800 shadow-sm shadow-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:shadow-slate-900`}
        >
            {children}
        </div>
    );
};

export default TopBar;
