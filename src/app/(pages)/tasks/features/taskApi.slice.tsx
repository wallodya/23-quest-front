"use client"

import { CreateTaskReqBody, Task, isTaskType } from "@task/types";
import { apiSlice } from "store/api";
import { ServerErrorResponse } from "types"


export const taskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => {
                return {
                    url: "/task",
                    method: "GET",
                };
            },
            providesTags: ["tasks"],
            transformResponse: (res) => {
                if (Array.isArray(res)) {
                    const dateSortingFn = (taskA: Task, taskB: Task) => {
                        const dateA = new Date(taskA.createdAt);
                        const dateB = new Date(taskB.createdAt);
                        return dateA > dateB ? -1 : 1;
                    };
                    return res.sort(dateSortingFn);
                }
                return null;
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                return err
            },
        }),
        createTask: builder.mutation({
            query: (task: CreateTaskReqBody) => {
                return {
                    url: "/task",
                    method: "POST",
                    body: task,
                };
            },
            transformResponse: (res: Task & { repeatTimes: number }) => {
                return { ...res, repeatCount: res.repeatTimes };
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
               return err
            },
        }),
        completeTask: builder.mutation({
            query: (taskId) => {
                return {
                    url: "/task/complete",
                    method: "PATCH",
                    params: {
                        id: taskId,
                    },
                };
            },
            transformResponse: (res: Task) => {
                return res;
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                return err
            },
        }),
        chekTask: builder.mutation({
            query: (taskId) => {
                return {
                    url: "/task/check",
                    method: "PATCH",
                    params: {
                        id: taskId,
                    },
                };
            },
            transformResponse: (res: Task & { repeatTimes: number }) => {
                return { ...res, repeatCount: res.repeatTimes };
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                return err
            },
        }),
        failTask: builder.mutation({
            query: (taskId) => {
                return {
                    url: "/task/fail",
                    method: "PATCH",
                    params: {
                        id: taskId,
                    },
                };
            },
            transformResponse: (res: Task & { repeatTimes: number }) => {
                return { ...res, repeatCount: res.repeatTimes };
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                return err
            },
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetTasksQuery,
    useChekTaskMutation,
    useCompleteTaskMutation,
    useCreateTaskMutation,
    useFailTaskMutation,
} = taskApi;