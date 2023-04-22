"use client";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { FC, useEffect, useState } from "react";
import { FieldError } from "react-hook-form";
import { isServerErrorData } from "../../../../types/error.types";
import { toast } from "react-toastify";

export const useSignUpErrorToast = () => ({
    error,
    termsFieldError,
}: {
    error: FetchBaseQueryError | SerializedError | undefined;
    termsFieldError: FieldError | undefined;
}) => {
    if (!error && !termsFieldError) {
        return;
    }

    if (termsFieldError?.message) {
        toast.error(termsFieldError.message);
    } else if (error) {
        isServerErrorData(error)
            ? toast.error(error.message)
            : toast.error("Internal error");
    }
};

const useErrorMessage = ({
    error,
    isError,
    termsFieldError,
}: {
    error: FetchBaseQueryError | SerializedError | undefined;
    isError: boolean;
    termsFieldError: FieldError | undefined;
}): string => {
    const [errorField, setErrorField] = useState<string>("");

    useEffect(() => {
        if (!isError && !termsFieldError) {
            setErrorField("");
            return;
        }

        if (termsFieldError?.message) {
            setErrorField(termsFieldError.message);
        } else if (isError && error) {
            isServerErrorData(error)
                ? setErrorField(error.message)
                : setErrorField("Internal error");
        }
    }, [isError, termsFieldError]);

    return errorField;
};

const SignUpErrorLabel: FC<{
    error: FetchBaseQueryError | SerializedError | undefined;
    termsFieldError: FieldError | undefined;
    isError: boolean;
}> = ({ error, isError, termsFieldError }) => {
    const errorField = useErrorMessage({ error, isError, termsFieldError });

    if (isError || termsFieldError?.message) {
        return <span>{errorField}</span>;
    } else {
        return <></>;
    }
};

export default SignUpErrorLabel;
