import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { isNumberObject } from "util/types";

export type User = {
    uuid: string;
    login: string;
    email: string;
    isEmailConfirmed: boolean;
    dateOfBirth: string;
    updatedAt: string;
    createdAt: string;
}

export type UserState = Partial<User> & {
    token?: string;
    refreshedAt: string;
    isSignedIn: boolean;
};


export const isUserType = (user: unknown): user is User => {
    return (
        typeof user === "object" &&
        user !== null &&
        "uuid" in user &&
        "login" in user &&
        "email" in user &&
        "isEmailConfirmed" in user &&
        "dateOfBirth" in user &&
        "createdAt" in user &&
        "updatedAt" in user
    );
}
