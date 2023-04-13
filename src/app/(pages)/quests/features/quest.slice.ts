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
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            questApi.endpoints.createQuest.matchFulfilled,
            (state, { payload }) => {
                console.log("adding quest to state");
                if (isQuestType(payload)) {
                    console.log("updating state...");
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
                        console.log("updated tasks in quests");
                    }
                },
            ),
            builder.addMatcher(
                questApi.endpoints.addTaskToQuest.matchFulfilled,
                (state, { payload }) => {
                    console.log("payload:", payload);
                    if (
                        isTaskType(payload) &&
                        payload.uniqueQuestId &&
                        payload.isInQuest
                    ) {
                        state.tasksInQuests = [payload, ...state.tasksInQuests];
                        console.log("updated state:", current(state));
                    }
                },
            ),
            builder.addMatcher(
                taskApi.endpoints.chekTask.matchFulfilled,
                (state, { payload }) => {
                    // console.log("check payload: ", payload);
                    // console.log("isTaskType(payload)", isTaskType(payload));
                    // console.log("payload.isInQuest", payload.isInQuest);
                    // console.log("payload.uniqueQuestId", payload.uniqueQuestId);
                    // console.log(
                    //     "state.tasksInQuest",
                    //     state.tasksInQuests
                    // );
                    if (
                        isTaskType(payload) &&
                        payload.isInQuest &&
                        payload.uniqueQuestId
                    ) {
                        console.log("updating state...");
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
                    // console.log("fail payload: ", payload);
                    // console.log("isTaskType(payload)", isTaskType(payload));
                    // console.log("payload.isInQuest", payload.isInQuest);
                    // console.log("payload.uniqueQuestId", payload.uniqueQuestId);
                    // console.log(
                    //     "state.tasksInQuest",
                    //     state.tasksInQuests
                    // );
                    if (
                        isTaskType(payload) &&
                        payload.isInQuest &&
                        payload.uniqueQuestId
                    ) {
                        console.log("updating state...");
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
                    // console.log("complete payload: ", payload);
                    // console.log("isTaskType(payload)", isTaskType(payload));
                    // console.log("payload.isInQuest", payload.isInQuest);
                    // console.log("payload.uniqueQuestId", payload.uniqueQuestId);
                    // console.log(
                    //     "state.tasksInQuest",
                    //     state.tasksInQuests
                    // );
                    if (
                        isTaskType(payload) &&
                        payload.isInQuest &&
                        payload.uniqueQuestId
                    ) {
                        console.log("updating state...");
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


export const { openQuestForm, closeQuestForm } = questSlice.actions

export const  questReducer = questSlice.reducer
