import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {}
})


export const taskReducer = taskSlice.reducer