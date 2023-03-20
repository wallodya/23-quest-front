"use client";

import Link from "next/link";
import { useAppSelector } from "../../../store/hooks";
import DrawerSideMobie, { useMobileDrawer } from "../menu/DrawerSideMobie";



const HeaderMobile = () => {
    const { login, isSignedIn } = useAppSelector((state) => state.user);
    const { toggleDrawer, isDrawerOpen } = useMobileDrawer();

    return (
        // Add an AppBar
        <div className="grid grid-cols-main bg-slate-100 bg-none py-4 text-slate-800 shadow-sm shadow-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:shadow-slate-900 sm:hidden">
            {isSignedIn ? (
                <div className="col-start-2 flex items-center">
                    <button
                        onClick={toggleDrawer}
                    >
                        <></> /**Add icon */
                    </button>
                    <span
                        className="font-bold text-slate-800 dark:text-slate-100"
                    >
                        {login}
                    </span>
                    <DrawerSideMobie toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
                </div>
            ) : (
                <div className="col-start-2 flex">
                    <Link href="sign-in" className="ml-auto flex">
                        <span
                            className="font-bold text-slate-800 dark:text-slate-100"
                        >
                            Sign in
                        </span>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HeaderMobile;
