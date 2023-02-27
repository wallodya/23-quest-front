import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { isNumberObject } from "util/types";

export type User = {
    uuid: string;
    login: string;
    email: string;
    isEmailConfirmed: boolean;
    dateOfBirth: Date;
    createdAt: Date;
    updatedAt: Date;
}

