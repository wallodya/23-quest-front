import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { useEffect } from "react";
import { useSignOutMutation } from "../../store/api/api.slice";

type UseSignOutArgsType = {
    onError?: <T = any>(err?: T) => MaybePromise<void>,
    onSuccess?: <T = unknown>(res?: T) => MaybePromise<void>,
    onLoading?: () => MaybePromise<void>
}
type UseSignOutType = (props: UseSignOutArgsType) => {
    handleSignOut: () => MaybePromise<void>;
};

export const useSignOut: UseSignOutType = ({ onError, onSuccess, onLoading }) => {
    const [signOut, { isSuccess, isError, error, isLoading }] = useSignOutMutation();

    const handleSignOut = () => {
        signOut()
            .unwrap()
            .then((res) => typeof onSuccess === "function" ? onSuccess(res) : res)
            .catch((err) => typeof onError === "function" ? onError(err): err);
    };

    useEffect(() => {
        if (isSuccess && typeof onSuccess === "function") {
            onSuccess()
        }
        if (isError && typeof onError === "function") {
            onError(error)
        }
        if (isLoading && typeof onLoading === "function") {
            onLoading()
        }

    }, [isSuccess, isError, isLoading])

    return {
        handleSignOut,
    };
};