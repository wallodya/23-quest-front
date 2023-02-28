"use client"

import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { apiSlice } from "./api/api.slice";
import authReducer from "./auth/auth.slice";
import userReducer from "../app/(pages)/(user)/user.slice";
import { saveUserMiddleware } from "../app/(pages)/(user)/user.utils";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, saveUserMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
