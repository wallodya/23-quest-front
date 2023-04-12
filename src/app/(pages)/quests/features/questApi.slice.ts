import { CreateQuestBody } from "@quest/types";
import { CreateTaskReqBody, Task, isTaskType } from "@task/types";
import { apiSlice } from "store/api";
import { ServerErrorResponse } from "types";

export const questApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuests: builder.query({
            query: () => {
                return {
                    url: "/quest",
                    method: "GET",
                };
            },
            transformResponse: (res) => {
                return res;
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                console.log("get quests error:");
                console.log(err);
                // return err
            },
        }),
        getTasksForQuest: builder.query({
            query: (questId: string) => {
                // console.log("Getting tasks for quest: ", questId);
                return {
                    url: "/task/q",
                    method: "GET",
                    params: {
                        questId,
                    },
                };
            },
            transformResponse: (res) => {
                // console.log("Tasks for quest response");
                // console.log(res);
                if (Array.isArray(res) && res.every((i) => isTaskType(i))) {
                    const dateSortingFn = (taskA: Task, taskB: Task) => {
                        const dateA = new Date(taskA.createdAt);
                        const dateB = new Date(taskB.createdAt);
                        return dateA > dateB ? -1 : 1;
                    };
                    return (res.sort(dateSortingFn) as Task[]) ?? [];
                }
                return [] as Task[];
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                console.log("error while getting tasks for quest:");
                console.log(err);
                return err;
            },
        }),
        createQuest: builder.mutation({
            query: (createQuestBody: CreateQuestBody) => {
                console.log("create quest body:");
                console.log(createQuestBody);
                return {
                    url: "/quest",
                    method: "POST",
                    body: createQuestBody,
                };
            },
            transformResponse: (res) => {
                console.log("create quest response: ");
                console.log(res);
                return res;
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                console.log("create quest error:");
                console.log(err);
            },
        }),
        addTaskToQuest: builder.mutation({
            query: ({
                body: createTaskBody,
                questId,
            }: {
                body: CreateTaskReqBody;
                questId: string;
            }) => {
                console.log("Creating task for quest: ", questId)
                return {
                    url: "/task/q",
                    method: "POST",
                    body: createTaskBody,
                    params: {
                        questId
                    }
                };
            },
            transformResponse: (res) => {
                console.log("add task to quest res: ");
                console.log(res);
                return res;
            },
            transformErrorResponse: (err: ServerErrorResponse) => {
                console.log("Error while adding task to quest")
                console.log(err)
                return err
            }
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetQuestsQuery,
    useCreateQuestMutation,
    useGetTasksForQuestQuery,
    useAddTaskToQuestMutation,
} = questApi;
