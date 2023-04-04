import { createSlice } from "@reduxjs/toolkit";
import {
    Task,
    TasksState,
    isOptimisticTaskType,
    isTaskFormStep,
    isTaskType,
    isTaskTypeType,
} from "@task/types";

export const $TEST_task: Task = {
    uuid: "1",
    uniqueTaskId: "some-task-id",
    text: "some task text for testing bla bla jwfbfoebiwf",
    title: "task 1",
    types: ["PERIODIC", "TIMER", "REPEAT"],
    // types: ["REPEAT"],
    // types: ["PERIODIC"],
    // types: ["TIMER"],
    // types: ["BASIC"],
    isCompleted: false,
    isFailed: false,
    startTime: Number(new Date("2023-03-24")),
    endTime: Number(new Date("2023-04-25")),
    duration: 30 * 60 * 1000,
    repeatCount: 4,
    priority: "MEDIUM",
    isInQuest: false,
    questId: null,
    isCurrentInQuest: false,
    createdAt: Number(new Date("20-03-2023")),
    updatedAt: Number(new Date("20-03-2023")),
};

const $TEST_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const $TEST_tasks: Task[] = $TEST_ids.map((i) => ({
    ...$TEST_task,
    task_id: i,
    title: `test task ${i}`,
}));
const $TEST_completed_tasks: Task[] = $TEST_ids.map((i) => ({
    ...$TEST_task,
    task_id: i,
    isCompleted: true,
    title: `test completed task ${i}`,
}));
const $TEST_failed_tasks: Task[] = $TEST_ids.map((i) => ({
    ...$TEST_task,
    task_id: i,
    isFailed: true,
    title: `test failed task ${i}`,
}));

const initialState: TasksState = {
    activeTasks: $TEST_tasks,
    completedTasks: $TEST_completed_tasks,
    failedTasks: $TEST_failed_tasks,
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
        addTask: (state, { payload }) => {
            if (isOptimisticTaskType(payload)) {
                console.log("payload: ", payload);
                state.addedTasks = [...state.addedTasks, payload];
                state.taskForm.isOpen = false;
            }
        },
        openTaskForm: (state) => {
            state.taskForm.isOpen = true;
        },
        closeTaskForm: (state) => {
            state.taskForm.isOpen = false;
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
                    ...state.completedTasks,
                    { ...payload, isCompleted: true },
                ];
            }
        },
        failTask: (state, { payload }) => {
            if (isTaskType(payload)) {
                state.activeTasks = state.activeTasks.filter(
                    (task) => task.uniqueTaskId !== payload.uniqueTaskId,
                );
                state.failedTasks = [
                    ...state.completedTasks,
                    { ...payload, isFailed: true },
                ];
            }
        },
    },
});

export const {
    addTask,
    openTaskForm,
    closeTaskForm,
    setCurrentStep,
    setTypes,
    completeTask,
    failTask
} = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
