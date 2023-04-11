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
            transformResponse: (res) => {
                if (Array.isArray(res)) {
                    console.log("tasks: ",res)
                    const dateSortingFn = (taskA: Task, taskB: Task) => {
                        const dateA = new Date(taskA.createdAt)
                        const dateB = new Date(taskB.createdAt)
                        return dateA > dateB ? -1 : 1
                    }
                    return res.sort(dateSortingFn);
                }
                return null
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                console.log("Error while getting tasks", err?.data.message)
            }
        }),
        createTask: builder.mutation({
            query: (task: CreateTaskReqBody) => {
                console.log("create task req body: ", task)
                return {
                    url: "/task",
                    method: "POST",
                    body: task,
                }
            },
            transformResponse: (res: Task & { repeatTimes: number}) => {
                console.log("create task res: ", res)
                return {...res, repeatCount: res.repeatTimes}
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                console.log("Error while creating task", err?.data.message)
            }
        }),
        completeTask: builder.mutation({
            query: (taskId) => {
                return {
                    url: "/task/complete",
                    method: "PATCH",
                    params: {
                        id: taskId 
                    },
                }
            },
            transformResponse: (res) => {
                console.log("task completed res: ", res)
                return res
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                console.log("Error while completing task", err?.data?.message)
            }
        }),
        chekTask: builder.mutation({
            query: (taskId) => {
                return {
                    url: "/task/check",
                    method: "PATCH",
                    params: {
                        id: taskId 
                    },
                }
            },
            transformResponse: (res) => {
                console.log("task checked res: ", res)
                return res
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                console.log("Error while checking task", err?.data.message)
            }
        }),
        failTask: builder.mutation({
            query: (taskId) => {
                return {
                    url: "/task/fail",
                    method: "PATCH",
                    params: {
                        id: taskId 
                    },
                }
            },
            transformResponse: (res) => {
                console.log("task failed res: ", res)
                return res
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                console.log("Error while failing task", err?.data.message)
            }
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