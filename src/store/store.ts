"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { taskFiltersReducer, taskReducer } from "@task/features";
import {
    refreshUserMiddleware,
    removeUserMiddleware,
    saveUserMiddleware,
} from "../app/(pages)/(user)/common/user.utils";
import userReducer from "../app/(pages)/(user)/features/user.slice";
import { apiSlice } from "./api/api.slice";
import authReducer from "./auth/auth.slice";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    tasks: taskReducer,
    taskFilters: taskFiltersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            saveUserMiddleware,
            removeUserMiddleware,
            refreshUserMiddleware,
        ),
    // preloadedState: {
    //     user: {
    //         refreshedAt: (new Date()).toDateString(),
    //         isSignedIn: false
    //     },
    //     tasks: {
    //         activeTasks: [],
    //         completedTasks: [],
    //         failedTasks: [],
    //         addedTasks: [],
    //         taskForm: {
    //             isOpen: false,
    //             currentStep: "title&type",
    //             types: ["BASIC"],
    //         },
    //         refreshedAt: new Date().toDateString(),
    //     },
    // }
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
