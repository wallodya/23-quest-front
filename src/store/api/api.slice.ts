
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateAccountT } from "app/(pages)/(user)/sign-up/signUp.schema";
import { SignInBody } from "../../common/utils/server/api.types";
import { isStandartServerError } from "../../types/error.types";
import { User, UserState } from "../../types/user.types";
import { RootState } from "../store";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token
            if (token) {
                headers.set("Authorization", `${token}`)
            }
        },
        credentials: "include",
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        signIn: builder.mutation<UserState | null, SignInBody>({
            query: (signInBody) => ({
                url: "/auth/login",
                method: "POST",
                body: signInBody,
            }),
            transformErrorResponse: (res) => res.data,
            transformResponse: (res: User, meta) => {
                if (!meta?.response) {
                    return null;
                }

                const token = meta.response.headers.get("Authorization");
                if (!token) {
                    return null;
                }

                return {
                    ...res,
                    token,
                    isSignedIn: true,
                    refreshedAt: new Date().toDateString(),
                };
            },
        }),
        signOut: builder.mutation<UserState, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            transformResponse: () => {
                return {
                    isSignedIn: false,
                    refreshedAt: (new Date()).toDateString()
                }
            }
        }),
        signUp: builder.mutation<UserState | null, CreateAccountT>({
            query: ({ login, password, email }) => ({
                url: "auth/signup",
                method: "POST",
                body: {
                    login,
                    email,
                    password,
                },
            }),
            transformErrorResponse: (res) =>
                isStandartServerError(res) ? res.data : res,
            transformResponse: (res: User, meta) => {

                if (!meta?.response) {
                    return null;
                }

                const token = meta.response.headers.get("Authorization");
                if (!token) {
                    return null;
                }

                return {
                    ...res,
                    token,
                    isSignedIn: true,
                    refreshedAt: (new Date()).toDateString(),
                };
            },
        }),
        refresh: builder.mutation<UserState, void>({
            query: () => ({
                url: "auth/refresh",
                method: "GET"
            }),
            transformResponse: ({ res, meta }) => {

                const token = meta.response.headers.get("Authorization");
                if (!token) {
                    return null
                }

                return {
                    ...res,
                    token,
                    isSignedIn: true,
                    refreshedAt: (new Date()).toDateString()
                }
            }
        })
    }),
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
    apiSlice;
