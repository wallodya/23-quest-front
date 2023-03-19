"use client"

import Typography from "@mui/material/Typography";
import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { FC, useEffect, useState } from "react";
import { isServerErrorData } from "../../../../types/error.types";

const useErrorMessage = ({
    error,
    isError,
}: {
    error: FetchBaseQueryError | SerializedError | undefined;
    isError: boolean;
}): string => {
    const [errorLabel, setErrorLabel] = useState<string>("");

    useEffect(() => {
        if (!error) {
            setErrorLabel("");
            return;
        }

        if (isServerErrorData(error)) {
            setErrorLabel(error.message);
        } else {
            setErrorLabel("Internal error");
        }
    }, [isError]);

    return errorLabel
};

const SignInErrorLabel: FC<{
    error: FetchBaseQueryError | SerializedError | undefined;
    isError: boolean;
}> = ({ error, isError }) => {

    const errorLabel = useErrorMessage({ error, isError})

    if (isError) {
        return (
            <Typography variant="caption" component="span" color="error">
                {errorLabel}
            </Typography>
        );
    } else {
        return <></>;
    }
};

export default SignInErrorLabel
