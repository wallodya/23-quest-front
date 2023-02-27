import { AppBar } from "@mui/material";
import Link from "next/link";
import React from "react";

const HeaderMobile = () => {
    return (
        <AppBar className="grid sm:hidden grid-cols-main py-4 bg-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm shadow-slate-300 dark:shadow-slate-900">
           <div className="col-start-2">
                <p>Username</p>
           </div>
        </AppBar>
    );
};

export default HeaderMobile;
