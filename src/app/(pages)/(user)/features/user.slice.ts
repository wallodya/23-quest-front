"use client";

import { createSlice } from "@reduxjs/toolkit";
import "client-only";
import { apiSlice } from "store/api";
import { isUserStateType, isUserType, UserState } from "@user/types";

const initialState: UserState = {
    refreshedAt: (new Date()).toDateString(),
    isSignedIn: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initUser: (state, { payload }) => {
            if (isUserType(payload) && isUserStateType(payload)) {
                state.uuid = payload.uuid;
                state.login = payload.login;
                state.email = payload.email;
                state.isEmailConfirmed = payload.isEmailConfirmed;
                state.dateOfBirth = payload.dateOfBirth;
                state.createdAt = payload.createdAt;
                state.updatedAt = payload.updatedAt;
    
                state.token = payload.token
                state.refreshedAt = payload.refreshedAt
                state.isSignedIn = payload.isSignedIn
            }
        }
    },
    extraReducers: builder => {
        builder.addMatcher(
            apiSlice.endpoints.signIn.matchFulfilled,
            (state, { payload }) => {
                if (isUserType(payload)) {
                    state.uuid = payload.uuid;
                    state.login = payload.login;
                    state.email = payload.email;
                    state.isEmailConfirmed = payload.isEmailConfirmed;
                    state.dateOfBirth = payload.dateOfBirth;
                    state.createdAt = payload.createdAt;
                    state.updatedAt = payload.updatedAt;

                    state.token = payload.token
                    state.refreshedAt = payload.refreshedAt
                    state.isSignedIn = payload.isSignedIn
                }
            },
        );
        builder.addMatcher(
            apiSlice.endpoints.signUp.matchFulfilled,
            (state, { payload }) => {
                if (isUserType(payload)) {
                    state.uuid = payload.uuid;
                    state.login = payload.login;
                    state.email = payload.email;
                    state.isEmailConfirmed = payload.isEmailConfirmed;
                    state.dateOfBirth = payload.dateOfBirth;
                    state.createdAt = payload.createdAt;
                    state.updatedAt = payload.updatedAt;

                    state.token = payload.token
                    state.refreshedAt = payload.refreshedAt
                    state.isSignedIn = payload.isSignedIn
                }
            },
            );
            builder.addMatcher(
                apiSlice.endpoints.signOut.matchFulfilled,
                (state, { payload }) => {                    
                    state.uuid = undefined;
                    state.login = undefined;
                    state.email = undefined;
                    state.isEmailConfirmed = undefined;
                    state.dateOfBirth = undefined;
                    state.createdAt = undefined;
                    state.updatedAt = undefined;
        
                    state.token = undefined
                    state.refreshedAt = payload.refreshedAt 
                    state.isSignedIn = payload.isSignedIn
            }
        )
    }
})

export const { initUser } = userSlice.actions

export default userSlice.reducer
