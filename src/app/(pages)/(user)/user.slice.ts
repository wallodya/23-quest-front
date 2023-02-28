"use client"

import { createSelector, createSlice } from "@reduxjs/toolkit";
import { get, read, remember } from "jwt-client";
import { apiSlice } from "../../../store/api/api.slice";
import { store } from "../../../store/store";
import { isUserType, User, UserState } from "../../../types/user.types";

const sessionToken = get()
const session: User | null = sessionToken ? read(sessionToken).claim.sub : null;

const initialState: UserState = session
    ? {
          ...session,
          refreshedAt: new Date().toDateString(),
          isSignedIn: true,
          token: sessionToken,
      }
    : {
          refreshedAt: new Date().toDateString(),
          isSignedIn: false,
      };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
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
    }
})

export default userSlice.reducer
