import { createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { signInReq } from "../../common/utils/server/api";
import { SignInBody } from "../../common/utils/server/api.types";

export const signIn = createAsyncThunk(
    "auth/signIn",
    async (reqBody: SignInBody, { rejectWithValue }) => {
        try {
            const res = await signInReq(reqBody);
            return res;
        } catch (err: any) {
            return rejectWithValue(err?.message);
        }
    },
);
