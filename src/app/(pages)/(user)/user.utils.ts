"use client"

import { Middleware } from "@reduxjs/toolkit"
import { keep, read, remember, validate } from "jwt-client"
import { RootState } from "../../../store/store"
import { UserState } from "../../../types/user.types"

export const saveUserMiddleware: Middleware<{}, RootState> = ({ getState }) => next => action => {
    if (
        action.meta?.arg?.endpointName === "signIn" &&
        action?.meta?.requestStatus === "fulfilled"
    ) {
        const accessToken = action.payload.token.split(" ")[1];
        if (validate(accessToken)) {
            keep(accessToken)
        }
    }
    return next(action)
}
