import { createSlice } from "@reduxjs/toolkit";

type User = {
    login: string,
    email: string,
}

type AuthState = {
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    isSignedIn: boolean,
    error?: any,
    user?: User,
    userToken?: string,
}

const initialState: AuthState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isSignedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {}
});

export default authSlice.reducer;
