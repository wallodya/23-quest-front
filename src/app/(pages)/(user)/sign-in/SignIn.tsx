"use client";

import { FormControlUnstyled, InputUnstyled } from "@mui/base";
import { FormControl, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { signIn } from "../../../../store/auth/auth.thunk";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

const SignIn = () => {
    const dispatch = useAppDispatch();
    const { isSuccess: isAuthSuccess, user } = useAppSelector(
        (state) => state.auth,
    );

    const [loginValue, setLoginValue] = useState<string>("")
    const [passwordValue, setPasswordValue] = useState<string>("")

    const onSubmit = () => {
        dispatch(
            signIn({
                login: "wallodya",
                password: "1234",
            }),
        );
    };

    // useEffect(() => {
    //     if (isAuthSuccess) {
    //     } else {
    //     }
    // }, [isAuthSuccess]);

    return (
        <div className="flex flex-col gap-5">
            <TextField label={"Login"} variant={"outlined"}/>
            <button onClick={onSubmit}>SignIn</button>
        </div>
    );
};

export default SignIn;
