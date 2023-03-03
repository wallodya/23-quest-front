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
    ListItemIcon,
    ListItemText,
    MenuItem,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    useSignInMutation,
    useSignOutMutation,
} from "../../../store/api/api.slice";
import { useAppSelector } from "../../../store/hooks";

const HeaderMobile = () => {
    const { login, isSignedIn } = useAppSelector((state) => state.user);

    const [signOut, { isSuccess: isSignOutSuccess }] = useSignOutMutation();

    useEffect(() => {
        if (isSignOutSuccess) {
            console.log("Sign out success");
        }
    }, [isSignOutSuccess]);

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const handleSignOut = () => {
        signOut()
            .unwrap()
            .catch((err) => console.log(err));
    };
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

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

                    <Drawer
                        anchor="left"
                        open={isDrawerOpen}
                        onClose={toggleDrawer}
                        PaperProps={{
                            className:
                                "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
                        }}
                    >
                        <Link href="profile" className="flex justify-between">
                            <ListItemIcon>
                                <PersonRounded />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </Link>

                        <Link href="settings" className="flex justify-between">
                            <ListItemIcon>
                                <SettingsRounded />
                            </ListItemIcon>
                            <ListItemText>Settings</ListItemText>
                        </Link>

                        <Divider />
                        <Button variant="text" color="inherit" onClick={handleSignOut}>
                            <ListItemIcon>
                                <LogoutRounded />
                            </ListItemIcon>
                            <ListItemText>Log out</ListItemText>
                        </Button>
                    </Drawer>
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
