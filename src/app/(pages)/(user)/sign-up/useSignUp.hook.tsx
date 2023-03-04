"use client";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { FC, useEffect } from "react";
import { FieldError, SubmitHandler } from "react-hook-form";
import { useSignUpMutation } from "../../../../store/api/api.slice";
import { CreateAccountT } from "./signUp.schema";
import SignUpErrorLabel from "./SignUpErrorLabel";

type UseSignUpArgsType = {
    onSuccess?: <T = unknown>(res?: T) => MaybePromise<void>,
    onError?: <T = any>(err?: T) => MaybePromise<void>,
    onLoading?: () => MaybePromise<void>,
    termsFieldError: FieldError | undefined
}
type UseSignUpType = (args: UseSignUpArgsType) => {
    onSubmit: SubmitHandler<CreateAccountT>,
    BottomErrorLabel: FC
    mutation: {
        isLoading: boolean,
        isSuccess: boolean,
        isError: boolean,
        error:  FetchBaseQueryError | SerializedError | undefined
    }
}

export const useSignUp: UseSignUpType = ({ onLoading, onError, onSuccess, termsFieldError}) => {
    const [
        signIn,
        {
            isLoading,
            isSuccess,
            error,
            isError,
        },
    ] = useSignUpMutation();


    
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
    }, [isLoading, isError, isSuccess])
    
    const onSubmit: SubmitHandler<CreateAccountT> = (data) => {
        signIn(data);
    };
    
    return {
        onSubmit,
        BottomErrorLabel: () => (
            <SignUpErrorLabel
                error={error}
                termsFieldError={termsFieldError}
                isError={isError}
            />
        ),
        mutation: {
            isLoading,
            isSuccess,
            isError,
            error,
        },
    };
}