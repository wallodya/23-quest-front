import { createSlice, current } from "@reduxjs/toolkit";
import {
    Task,
    TaskTimer,
    TasksState,
    isOptimisticTaskType,
    isTaskFormStep,
    isTaskTimerType,
    isTaskType,
    isTaskTypeType,
} from "@task/types";
import { apiSlice } from "store/api";
import { taskApi } from "./taskApi.slice";

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
    startTime: new Date("2023-03-24"),
    endTime: new Date("2023-04-25"),
    duration: 30 * 60 * 1000,
    repeatCount: 4,
    priority: "MEDIUM",
    isInQuest: false,
    questId: null,
    isCurrentInQuest: false,
    createdAt: String(new Date("20-03-2023")),
    updatedAt: String(new Date("20-03-2023")),
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
    // activeTasks: $TEST_tasks,
    // completedTasks: $TEST_completed_tasks,
    // failedTasks: $TEST_failed_tasks,
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
                    ...state.completedTasks,
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
                console.log("create task match")
                if (isTaskType(payload)) {
                    state.activeTasks = [payload, ...state.activeTasks]
                    state.addedTasks = state.addedTasks.filter(task => task.title !== payload.title)
                    console.log(current(state))
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

} = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
