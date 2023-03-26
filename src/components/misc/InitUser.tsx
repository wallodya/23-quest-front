"use client";

import React, { useEffect } from "react";
import { initUser } from "../../app/(pages)/(user)/features/user.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { User, UserState } from "../../app/(pages)/(user)/types/user.types";
import jwt_decode from "jwt-decode";

const InitUser = () => {
    const {isSignedIn} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        const token = localStorage.getItem("JWT_TOKEN")
        if (!isSignedIn && token) {
            const decodedToken = jwt_decode<{sub: User, iat: number, exp: number}>(token).sub
            const payload: UserState = {
                ...decodedToken,
                token: token,
                refreshedAt: (new Date()).toDateString(),
                isSignedIn: true
            }

            dispatch(initUser(payload))
        }
    }, [isSignedIn])

    return <></>;
};

export default InitUser;
