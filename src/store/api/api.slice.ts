import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateAccountT } from "../../app/(pages)/(user)/sign-up/SignUp";
import { SignInBody } from "../../common/utils/server/api.types";
import { isStandartServerError } from "../../types/error.types";
import { User } from "../../types/user.types";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
    endpoints: (builder) => ({
        signIn: builder.mutation<User, SignInBody>({
            query: (signInBody) => ({
                url: "/auth/login",
                method: "POST",
                body: signInBody,
            }),
            transformErrorResponse: (res) => res.data
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
            transformErrorResponse: (res) => isStandartServerError(res) ? res.data : res
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation } = apiSlice;
