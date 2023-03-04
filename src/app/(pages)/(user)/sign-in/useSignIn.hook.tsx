"use client"

import Typography from "@mui/material/Typography/Typography";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { SignInBody } from "../../../../common/utils/server/api.types";
import { useSignInMutation } from "../../../../store/api/api.slice";
import { isServerErrorData } from "../../../../types/error.types";
import SignInErrorLabel from "./useSignInErrorLabel.hook";


type UseSignInArgsType = {
    onSuccess?: <T = unknown>(res?: T) => MaybePromise<void>,
    onError?: <T = any>(err?: T) => MaybePromise<void>,
    onLoading?: () => MaybePromise<void>,
}

type UseSignInType = (args: UseSignInArgsType) => {
    onSubmit: SubmitHandler<SignInBody>,
    BottomErrorLabel: FC
    mutation: {
        isLoading: boolean,
        isSuccess: boolean,
        isError: boolean,
        error:  FetchBaseQueryError | SerializedError | undefined
    }
}

export const useSignIn: UseSignInType = ({
    onSuccess,
    onError,
    onLoading,
}) => {
    const [signIn, { isLoading, isSuccess, isError, error }] =
        useSignInMutation();

    useEffect(() => {
        if (isSuccess && typeof onSuccess === "function") {
            onSuccess();
        }
        if (isError && typeof onError === "function") {
            onError(error);
        }
        if (isLoading && typeof onLoading === "function") {
            onLoading();
        }
    }, [isSuccess, isError, isLoading]);

    const onSubmit: SubmitHandler<SignInBody> = (data) => {
        signIn(data)
    };

    return {
        onSubmit,
        BottomErrorLabel: () => <SignInErrorLabel error={error} isError={isError}/>,
        mutation: {
            isLoading,
            isError,
            isSuccess,
            error,
        },
    };
};