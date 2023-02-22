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
    userToken?: string,
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
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state, action) => {
                state.isLoading = true
                state.isSuccess = false
                state.isError = false
                state.isSettled = false
                state.isSignedIn = false
            })
            .addCase(signIn.fulfilled, (state, action) => {
                if (action.payload.error) {
                    state.isLoading = false

                    state.isSuccess = false
                    state.isError = false
                    state.isSettled = true
                    state.isSignedIn = false

                } else {
                    state.isLoading = false

                    state.isSuccess = true
                    state.isError = false
                    state.isSettled = true
                    state.isSignedIn = true
                    state.user = action.payload
                }
            })
            .addCase(signIn.rejected, (state, action) => {
                console.log("Error payload: ", action.payload)
                state.isLoading = false
                state.isError = true
                state.error = action.payload
                state.isSignedIn = false
                state.isSuccess = false
                state.isSettled = true
            })
    }
});

export default authSlice.reducer;
