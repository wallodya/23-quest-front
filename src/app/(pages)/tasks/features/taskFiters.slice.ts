"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const taskFiltersSlice = createSlice({
    name:"task_filters",
    initialState,
    reducers: {}
})

export const taskFiltersReducer = taskFiltersSlice.reducer
