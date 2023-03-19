import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import { useSignInMutation } from "../../../store/api/api.slice";

const NavBarDesktopGuest = () => {
    return (
        <div className="col-start-3 flex justify-end items-center">
            <Link href="/sign-in">
                <Button variant="outlined" color="inherit">
                    <Typography
                        variant="subtitle2"
                        component="span"
                        className="ml-auto font-bold text-slate-800 dark:text-slate-100"
                    >
                        Sign in
                    </Typography>
                </Button>
            </Link>
        </div>
    );
};

export default NavBarDesktopGuest;
