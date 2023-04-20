import { Middleware } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "store";

const IS_BROWSER = typeof window === "object" && "[object Window]" === window.toString.call(window);


export const catchTaskNameConflictMiddleware: Middleware<{}, RootState> = ({ getState }) => next => action => {
    if (
        action.meta?.arg?.endpointName === "createTask" &&
        action?.meta?.requestStatus === "rejected" &&
        IS_BROWSER
    ) {
        const errStatus = action?.meta?.baseQueryMeta?.response?.status
        if (Number(errStatus) === 409) {
            toast.error("Task with this name already exists")
        }
    }
    return next(action)
}