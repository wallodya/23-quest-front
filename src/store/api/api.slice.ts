"use client"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateAccountT } from "app/(pages)/(user)/sign-up/signUp.schema";
import { SignInBody } from "../../common/utils/server/api.types";
import { isStandartServerError } from "../../types/error.types";
import { User, UserState } from "../../app/(pages)/(user)/types/user.types";
import { RootState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set("Authorization", `${token}`);
            }
        },
        credentials: "include",
    }),
    // extractRehydrationInfo(action, { reducerPath }) {
    //     console.log("extract rehydration: ", action.type)
    //     if (action.type === HYDRATE) {
    //         console.log("hydration")
    //         return action.payload[reducerPath];
    //     }
    // },
    tagTypes: ["user", "tasks", "quests", "quest-tasks"],
    endpoints: (builder) => ({
        signIn: builder.mutation<UserState | null, SignInBody>({
            query: (signInBody) => ({
                url: "/auth/login",
                method: "POST",
                body: signInBody,
            }),
            invalidatesTags: ["user", "tasks", "quests", "quest-tasks"],
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
            invalidatesTags: ["user", "tasks", "quests", "quest-tasks"],
            transformResponse: () => {
                return {
                    isSignedIn: false,
                    refreshedAt: new Date().toDateString(),
                };
            },
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
            invalidatesTags: ["user", "tasks", "quests", "quest-tasks"],
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
                    refreshedAt: new Date().toDateString(),
                };
            },
        }),
        refresh: builder.mutation<UserState, void>({
            query: () => ({
                url: "auth/refresh",
                method: "GET",
            }),
            transformResponse: ({ res, meta }) => {
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
    }),
});


export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
    apiSlice;

