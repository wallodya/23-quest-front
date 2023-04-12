"use client"

import { QuestState, isQuestType } from "@quest/types";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { questApi } from "./questApi.slice";
import { isTaskType } from "@task/types";

const initialState: QuestState = {
    quests: [],
    tasksInQuests: {},
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
            (state, { payload } ) => {
                console.log("adding quest to state")
                if (isQuestType(payload)) {
                    console.log("updating state...")
                    state.quests = [payload, ...state.quests]
                }
            }
        ),
        builder.addMatcher(
            questApi.endpoints.getQuests.matchFulfilled,
            (state, { payload } ) => {
                if (Array.isArray(payload) && payload.every(i => isQuestType(i))) {
                    state.quests = payload
                }
            }
        )
        builder.addMatcher(
            questApi.endpoints.getTasksForQuest.matchFulfilled,
            (state, { payload }) => {
                if (Array.isArray(payload) && payload.every(i => isTaskType(i))) {
                    const firstTask = payload[0] ?? null
                    if (firstTask && firstTask.uniqueQuestId) {
                        state.tasksInQuests[firstTask.uniqueQuestId] = payload
                    }
                    console.log("updated tasks in quest: ", firstTask?.uniqueQuestId)
                }
            }
        )
    }
})


export const { openQuestForm, closeQuestForm } = questSlice.actions

export const  questReducer = questSlice.reducer
