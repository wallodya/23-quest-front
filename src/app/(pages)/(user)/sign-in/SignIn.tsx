"use client";

import React from "react";
import { signIn } from "../../../../store/auth/auth.thunk";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

const SignIn = () => {
    const dispatch = useAppDispatch();
    const { isSuccess: isAuthSuccess, user } = useAppSelector((state) => state.auth)

    const onSubmit = () => {
        dispatch(signIn({
            login: "wallodya",
            password: "1234"
        }))
            .unwrap()
            .then(() => {
                if (isAuthSuccess) {
                    console.log("Auth success")
                    console.log(user)
                } else {
                    console.log("No auth")
                }
            })
            .catch((err) => console.log("NO", err));
    };

    return <button onClick={onSubmit}>SignIn</button>;
};

export default SignIn;
