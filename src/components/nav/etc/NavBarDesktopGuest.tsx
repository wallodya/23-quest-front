import Link from "next/link";
import React from "react";
import { useSignInMutation } from "../../../store/api/api.slice";

// Should have a Button element
const NavBarDesktopGuest = () => {
    return (
        <div className="col-start-3 flex justify-end items-center">
            <Link href="/sign-in">
                        <span className="ml-auto font-bold text-slate-800 dark:text-slate-100">
                            Sign in
                        </span>
            </Link>
        </div>
    );
};

export default NavBarDesktopGuest;
