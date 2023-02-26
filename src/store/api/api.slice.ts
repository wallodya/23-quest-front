import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateAccountT } from "../../app/(pages)/(user)/sign-up/SignUp";
import { SignInBody } from "../../common/utils/server/api.types";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (signInBody) => ({
                url: "/auth/login",
                method: "POST",
                body: signInBody,
            }),
        }),
        signUp: builder.mutation({
            query: ({ login, password, email }: CreateAccountT) => ({
                url: "auth/signup",
                method: "POST",
                body: {
                    login,
                    email,
                    password,
                },
            }),
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation } = apiSlice;
