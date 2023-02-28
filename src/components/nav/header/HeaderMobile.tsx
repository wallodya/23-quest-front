"use client"

import { AppBar, Typography } from "@mui/material";
import { useSignInMutation } from "../../../store/api/api.slice";
import { useAppSelector } from "../../../store/hooks";



const HeaderMobile = () => {
    const { login, isSignedIn } = useAppSelector(state => state.user)

    return (
        <AppBar className="grid grid-cols-main bg-slate-100 bg-none py-4 text-slate-800 shadow-sm shadow-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:shadow-slate-900 sm:hidden">
                {
                    isSignedIn
                        ?
                <div className="col-start-2 flex justify-between">
                    <Typography
                        variant="subtitle2"
                        component="span"
                        className="font-bold text-slate-800 dark:text-slate-100"
                    >
                        {login}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        component="span"
                        className="font-bold text-slate-800 dark:text-slate-100"
                    >
                        Sign out
                    </Typography>

                </div>
                :
                <div className="col-start-2 flex">
                    <Typography
                        variant="subtitle2"
                        component="span"
                        className="ml-auto font-bold text-slate-800 dark:text-slate-100"
                    >
                        Sign in
                    </Typography>
                </div>
                }
        </AppBar>
    );
};

export default HeaderMobile;
