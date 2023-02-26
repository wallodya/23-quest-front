import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./auth.thunk";

type User = {
    login: string,
    email: string,
}

type AuthState = {
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    isSettled: boolean
    isSignedIn: boolean,
    error?: any,
    user?: User,
    userToken?: string | null,
}

const initialState: AuthState = {
    isLoading: false,
    isError: false,
    isSuccess: false,
    isSignedIn: false,
    isSettled: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
});

export default authSlice.reducer;
