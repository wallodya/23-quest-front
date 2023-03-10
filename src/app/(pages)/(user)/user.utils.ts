import { Middleware } from "@reduxjs/toolkit"
import { RootState } from "../../../store/store"
import { UserState } from "../../../types/user.types"

export const IS_BROWSER = typeof window === "object" && "[object Window]" === window.toString.call(window);

export const saveUserMiddleware: Middleware<{}, RootState> = ({ getState }) => next => action => {
    if (
        action.meta?.arg?.endpointName === "signIn" &&
        action?.meta?.requestStatus === "fulfilled" &&
        IS_BROWSER
    ) {
        const accessToken = action.payload.token.split(" ")[1];
        if (accessToken) {
            localStorage.setItem("JWT_TOKEN", accessToken)
        }
    }
    return next(action)
}

export const removeUserMiddleware: Middleware<{}, RootState> = ({ getState }) => next => action => {
    if (
        action.meta?.arg?.endpointName === "signOut" &&
        action?.meta?.requestStatus === "fulfilled" &&
        IS_BROWSER
    ) {
        localStorage.removeItem("JWT_TOKEN");
    }
    return next(action)
}

export const refreshUserMiddleware: Middleware<{}, RootState> = ({ getState }) => next => action => {
    if (
        action?.meta?.arg?.endpointName !== "signOut" &&
        action?.meta?.requestStatus === "fulfilled" &&
        IS_BROWSER
    ) {
        localStorage.setItem(
            "JWT_TOKEN",
            action.meta.baseQueryMeta.response.headers
                .get("Authorization")
                .split(" ")[1],
        );
    }

    return next(action)
}