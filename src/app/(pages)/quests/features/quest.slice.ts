"use client"

import { QuestState } from "@quest/types";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState: QuestState = {
    quests: [],
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
    // extraReducers: {
    //     [HYDRATE] :(state, action) => {
    //         return {
    //             ...state,
    //             action.payload.quests
    //         }
    //     }
    // }
})


export const { openQuestForm, closeQuestForm } = questSlice.actions

export const  questReducer = questSlice.reducer
