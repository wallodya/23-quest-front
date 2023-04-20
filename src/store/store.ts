"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { taskFiltersReducer, taskReducer } from "@task/features";
import {
    catchAuthExceptionsMiddleware,
    refreshUserMiddleware,
    removeUserMiddleware,
    saveUserMiddleware,
} from "@user/common";
import userReducer from "@user/features/user.slice";
import { apiSlice } from "./api/api.slice";
import { questReducer } from "@quest/features";
import { catchQuestNameConflictMiddleware } from "@quest/common/utils";
import { catchTaskNameConflictMiddleware } from "@task/utils";

const rootReducer = combineReducers({
    user: userReducer,
    tasks: taskReducer,
    quests: questReducer,
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
            catchAuthExceptionsMiddleware,
            catchQuestNameConflictMiddleware,
            catchTaskNameConflictMiddleware,
        ),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
