import { Middleware } from "@reduxjs/toolkit"
import { User } from "@user/types";
import { RootState } from "store"
import jwt_decode from "jwt-decode";

export const IS_BROWSER = typeof window === "object" && "[object Window]" === window.toString.call(window);
const decodedUserToken = (token: string) => {
    return jwt_decode<{sub: User, iat: number, exp: number}>(token)
}

export const saveUserMiddleware: Middleware<{}, RootState> = ({ getState }) => next => action => {
    if (
        action.meta?.arg?.endpointName === "signIn" &&
        action?.meta?.requestStatus === "fulfilled" &&
        IS_BROWSER
    ) {
        const accessToken = action.payload.token.split(" ")[1];
        const decodedToken = decodedUserToken(accessToken)?.sub
        if (accessToken) {
            action.payload = { ...action.payload, ...decodedToken}
            localStorage.setItem("JWT_TOKEN", accessToken) //TODO make util func's for getting and setting user in LS + make config with token name
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
        IS_BROWSER &&
        action?.meta?.arg?.endpointName !== "signOut" &&
        action?.meta?.requestStatus === "fulfilled" &&
        action.meta.baseQueryMeta.response.headers.get("Authorization")
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
