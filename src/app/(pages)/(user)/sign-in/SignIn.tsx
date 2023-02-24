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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const data = {} as SignInBody;
        type dataKey = keyof typeof data;

        const formEntries = formData.entries() as unknown as [
            dataKey,
            (typeof data)[dataKey],
        ][];

        for (const pair of formEntries) {
            const key: dataKey = pair[0];
            const value = pair[1];
            data[key] = value;
        }
        console.log(data);
    };

    return (
        <div className="flex flex-col gap-5">
            <form onSubmit={handleSubmit}>
                <TextField name="login" label={"Login"} variant={"outlined"} />
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
