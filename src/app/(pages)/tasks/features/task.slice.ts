import { createSelector, createSlice, current } from "@reduxjs/toolkit";
import {
    isTaskFormStep,
    isTaskType,
    isTaskTypeType,
    Task,
    TasksState,
} from "@task/types";

const $TEST_task: Task = {
    task_id: 1,
    userId: 1,
    uniqueTaskId: "some-task-id",
    text: "some task text for testing bla bla jwfbfoebiwf",
    title: "task 1",
    types: ["PERIODIC", "TIMER", "REPEAT"],
    isCompleted: false,
    isFailed: false,
    startTime: Number(new Date("2023-03-24")),
    endTime: Number(new Date("2023-03-25")),
    duration: 30 * 60 * 1000,
    repeatTimes: 3,
    priority: "MEDIUM",
    difficulty: "EASY",
    isInQuest: false,
    questId: null,
    isCurrentInQuest: false,
    createdAt: new Date("20-03-2023").toDateString(),
    updatedAt: new Date("20-03-2023").toDateString(),
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
            if (isTaskType(payload)) {
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
                state.taskForm.types = payload
            }
        },
    },
});

// export const selectActiveTasks = createSelector()

export const {
    addTask,
    openTaskForm,
    closeTaskForm,
    setCurrentStep,
    setTypes,
} = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
