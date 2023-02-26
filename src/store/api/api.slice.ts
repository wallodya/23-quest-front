import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SignInBody } from '../../common/utils/server/api.types';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (signInBody: SignInBody) => ({
                url: "/auth/login",
                method: "POST",
                body: signInBody,
            }),
        }),
    }),
});

export const { useSignInMutation } = apiSlice
