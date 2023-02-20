import { createSlice } from "@reduxjs/toolkit";

type UserState = {
    login: string,
    email: string,
}

const initialState: UserState = {
    login: "User1",
    email: "user@test.com"
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: undefined
})