"use client";

import { FormControlUnstyled, InputUnstyled } from "@mui/base";
import { FormControl, Input, TextField } from "@mui/material";
import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    useEffect,
    useState,
} from "react";
import { getFormData } from "../../../../common/utils/forms.utils";
import { SignInBody } from "../../../../common/utils/server/api.types";
import { signIn } from "../../../../store/auth/auth.thunk";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

const SignIn = () => {
    const dispatch = useAppDispatch();
    const { isSuccess: isAuthSuccess, user } = useAppSelector(
        (state) => state.auth,
    );

    const [loginValue, setLoginValue] = useState<string>("");
    const [passwordValue, setPasswordValue] = useState<string>("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = getFormData<SignInBody>(event);

        dispatch(
            signIn(data)
        )
    };

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
                <TextField
                    name="login"
                    label={"Login"}
                    variant={"outlined"}
                />
                <TextField
                    name="password"
                    label={"Password"}
                    variant={"outlined"}
                />
                <input type={"submit"} value={"Sign in"} />
            </form>
        </div>
    );
};

export default SignIn;
