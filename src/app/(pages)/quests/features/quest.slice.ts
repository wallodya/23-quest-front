"use client"

import { QuestState, isQuestType } from "@quest/types";
import { createSlice, current } from "@reduxjs/toolkit";
import { questApi } from "./questApi.slice";
import { isTaskType } from "@task/types";
import { taskApi } from "@task/features/taskApi.slice";

const initialState: QuestState = {
    quests: [],
    tasksInQuests: [],
    questForm: {
        isOpen: false
    }
}

const questSlice = createSlice({
    name: "quests",
    initialState,
    reducers: {
        openQuestForm: (state) => {
            state.questForm.isOpen = true
        },
        closeQuestForm: (state) => {
            state.questForm.isOpen = false
        },
        resetQuestState: (state) => {
            console.log("reseting quest state")
            state = initialState
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            questApi.endpoints.createQuest.matchFulfilled,
            (state, { payload }) => {
                if (isQuestType(payload)) {
                    state.quests = [payload, ...state.quests];
                }
            },
        ),
            builder.addMatcher(
                questApi.endpoints.getQuests.matchFulfilled,
                (state, { payload }) => {
                    if (
                        Array.isArray(payload) &&
                        payload.every((i) => isQuestType(i))
                    ) {
                        state.quests = payload;
                    }
                },
            ),
            builder.addMatcher(
                questApi.endpoints.getTasksForQuest.matchFulfilled,
                (state, { payload }) => {
                    if (
                        Array.isArray(payload) &&
                        payload.every((i) => isTaskType(i))
                    ) {
                        state.tasksInQuests = [
                            ...payload,
                            ...state.tasksInQuests,
                        ];
                    }
                },
            ),
            builder.addMatcher(
                questApi.endpoints.addTaskToQuest.matchFulfilled,
                (state, { payload }) => {
                    if (
                        isTaskType(payload) &&
                        payload.uniqueQuestId &&
                        payload.isInQuest
                    ) {
                        state.tasksInQuests = [payload, ...state.tasksInQuests];
                    }
                },
            ),
            builder.addMatcher(
                taskApi.endpoints.chekTask.matchFulfilled,
                (state, { payload }) => {
                    if (
                        isTaskType(payload) &&
                        payload.isInQuest &&
                        payload.uniqueQuestId
                    ) {
                        state.tasksInQuests = [
                            payload,
                            ...state.tasksInQuests.filter(
                                (task) =>
                                    task.uniqueTaskId !== payload.uniqueTaskId,
                            ),
                        ];
                    }
                },
            );
            builder.addMatcher(
                taskApi.endpoints.failTask.matchFulfilled,
                (state, { payload }) => {
                    if (
                        isTaskType(payload) &&
                        payload.isInQuest &&
                        payload.uniqueQuestId
                    ) {
                        state.tasksInQuests = [
                            ...state.tasksInQuests.filter(
                                (task) =>
                                    task.uniqueTaskId !== payload.uniqueTaskId,
                            ),
                            payload,
                        ];
                    }
                },
            );
            builder.addMatcher(
                taskApi.endpoints.completeTask.matchFulfilled,
                (state, { payload }) => {
                    if (
                        isTaskType(payload) &&
                        payload.isInQuest &&
                        payload.uniqueQuestId
                    ) {
                        state.tasksInQuests = [
                            ...state.tasksInQuests.filter(
                                (task) =>
                                    task.uniqueTaskId !== payload.uniqueTaskId,
                            ),
                            payload,
                        ];
                    }
                },
            );
    }
})


export const { openQuestForm, closeQuestForm, resetQuestState } = questSlice.actions

export const  questReducer = questSlice.reducer
