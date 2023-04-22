import { RootState } from "store";
import moment from "moment";
import { useTaskTypeFlags } from "@task/hooks";
import { getTodayTasks } from "@task/utils";

export const selectTasksSlice = () => (state: RootState) => state.tasks;

export const selectActiveTasks = () => (state: RootState) =>
    state.tasks.activeTasks;

export const selectFailedTasks = () => (state: RootState) =>
    state.tasks.failedTasks;

export const selectCompletedTasks = () => (state: RootState) =>
    state.tasks.completedTasks;

export const selectCompletedToday = () => (state: RootState) =>
    state.tasks.completedTasks.filter((task) =>
        moment(task.updatedAt).isBetween(
            moment().startOf("day"),
            moment().endOf("day"),
        ),
    );

export const selectActiveToday = () => (state: RootState) =>
    getTodayTasks(state.tasks.activeTasks);
