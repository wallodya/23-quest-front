import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"

export type ServerErrorData = {
    statusCode: number,
    message: string,
    error: string
}

export type ServerErrorResponse = {
    status: number,
    data: ServerErrorData
}

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === "object" && error !== null && "status" in error
}

export const isServerErrorData = (data: unknown): data is ServerErrorData => {
    return typeof data === "object" && data !== null && "statusCode" in data && "message" in data && "error" in data
}

export const isStandartServerError = (error: FetchBaseQueryError): error is ServerErrorResponse => {
    return (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        typeof error.status === "number" &&
        "data" in error &&
        isServerErrorData(error.data)
    );
}
