"use client"

import { createSlice, current } from "@reduxjs/toolkit";
import {
    TasksState,
    isOptimisticTaskType,
    isTaskFormStep,
    isTaskType,
    isTaskTypeType
} from "@task/types";
import { taskApi } from "./taskApi.slice";

const initialState: TasksState = {
    activeTasks: [],
    completedTasks: [],
    failedTasks: [],
    addedTasks: [],
    taskForm: {
        isOpen: false,
        currentStep: "title&type",
        types: ["BASIC"],
    },
    refreshedAt: new Date().toDateString(),
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        resetTaskState: (state) => {
            console.log("reseting task slice")
            state = initialState
        },
        addTask: (state, { payload }) => {
            if (isOptimisticTaskType(payload)) {
                state.addedTasks = [...state.addedTasks, payload];
                state.taskForm.isOpen = false;
            }
        },
        openTaskForm: (state) => {
            state.taskForm.isOpen = true;
        },
        closeTaskForm: (state) => {
            state.taskForm.isOpen = false;
            state.taskForm.currentStep = "title&type"
            state.taskForm.types = ["BASIC"]
        },
        setCurrentStep: (state, { payload }) => {
            if (isTaskFormStep(payload)) {
                state.taskForm.currentStep = payload;
            }
        },
        setTypes: (state, { payload }) => {
            if (isTaskTypeType(payload)) {
                state.taskForm.types = payload;
            }
        },
        completeTask: (state, { payload }) => {
            state.activeTasks = state.activeTasks.filter(
                (task) => task.uniqueTaskId !== payload.uniqueTaskId,
            );
            if (isTaskType(payload)) {
                state.completedTasks = [
                    { ...payload, isCompleted: true },
                    ...state.completedTasks,
                ];
            }
        },
        failTask: (state, { payload }) => {
            if (isTaskType(payload)) {
                state.activeTasks = state.activeTasks.filter(
                    (task) => task.uniqueTaskId !== payload.uniqueTaskId,
                );
                state.failedTasks = [
                    { ...payload, isFailed: true },
                    ...state.failedTasks,
                ];
            }
        },
        checkTask: (state, { payload }) => {
            if (isTaskType(payload)) {
                const checkedTask = state.activeTasks.find(task => task.uniqueTaskId === payload.uniqueTaskId)
                if (checkedTask) {
                    state.activeTasks = state.activeTasks.map((task) =>
                        task.uniqueTaskId === payload.uniqueTaskId
                            ? { ...task, repeatCount: task.repeatCount ? task.repeatCount - 1 : null}
                            : task,
                    );
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            taskApi.endpoints.getTasks.matchFulfilled,
            (state, { payload }) => {
                if (Array.isArray(payload) && payload.every(isTaskType)){
                    state.activeTasks = payload.filter(task => !task.isCompleted && !task.isFailed)
                    state.completedTasks = payload.filter(task => task.isCompleted && !task.isFailed)
                    state.failedTasks = payload.filter(task => !task.isCompleted && task.isFailed)
                }
            }
        ),
        builder.addMatcher(
            taskApi.endpoints.createTask.matchFulfilled,
            (state, { payload }) => {
                if (isTaskType(payload)) {
                    state.activeTasks = [payload, ...state.activeTasks]
                    state.addedTasks = state.addedTasks.filter(task => task.title !== payload.title)
                }
            },
        ),
        builder.addMatcher(
            taskApi.endpoints.createTask.matchRejected,
            (state, {payload}) => {
            
            }
        )
    }
});

export const {
    addTask,
    openTaskForm,
    closeTaskForm,
    setCurrentStep,
    setTypes,
    completeTask,
    failTask,
    checkTask,
    resetTaskState,
} = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
