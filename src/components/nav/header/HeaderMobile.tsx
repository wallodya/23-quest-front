"use client";

import {
    LoginRounded,
    LogoutRounded,
    MenuRounded,
    PersonRounded,
    SettingsRounded,
} from "@mui/icons-material";
import {
    AppBar,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Typography,
} from "@mui/material";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSignOut } from "../../../common/hooks/useSignOut.hook";
import {
    useSignInMutation,
    useSignOutMutation,
} from "../../../store/api/api.slice";
import { useAppSelector } from "../../../store/hooks";
import DrawerSideMobie, { useMobileDrawer } from "../menu/DrawerSideMobie";



const HeaderMobile = () => {
    const { login, isSignedIn } = useAppSelector((state) => state.user);
    const { toggleDrawer, isDrawerOpen } = useMobileDrawer();

    return (
        <AppBar className="grid grid-cols-main bg-slate-100 bg-none py-4 text-slate-800 shadow-sm shadow-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:shadow-slate-900 sm:hidden">
            {isSignedIn ? (
                <div className="col-start-2 flex items-center">
                    <Button
                        variant="text"
                        color="inherit"
                        onClick={toggleDrawer}
                    >
                        <MenuRounded />
                    </Button>
                    <Typography
                        variant="subtitle2"
                        component="span"
                        className="font-bold text-slate-800 dark:text-slate-100"
                    >
                        {login}
                    </Typography>
                    <DrawerSideMobie toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
                </div>
            ) : (
                <div className="col-start-2 flex">
                    <Link href="sign-in" className="ml-auto flex">
                        <Typography
                            variant="subtitle2"
                            component="span"
                            className="font-bold text-slate-800 dark:text-slate-100"
                        >
                            Sign in
                        </Typography>
                    </Link>
                </div>
            )}
        </AppBar>
    );
};

export default HeaderMobile;
