import { selectTasksSlice } from "@task/features";
import { Task } from "@task/types";
import { findMaxDate } from "common/utils";
import moment from "moment";
import { useAppSelector } from "store";

export const useTasksStats = () => {
    const { completedTasks, activeTasks, failedTasks } = useAppSelector(selectTasksSlice())

    const lastCompletedTaskTime = completedTasks[0] ? moment(completedTasks[0]?.updatedAt) : null

    const lastCreatedTaskTime = moment(findMaxDate<Task>(
        [
            activeTasks[0] ?? null,
            failedTasks[0] ?? null,
            completedTasks[0] ?? null,
        ],
        (task) => task ? task.createdAt : Number.NEGATIVE_INFINITY,
    ));

    const allTasksAmount = [...completedTasks, ...activeTasks, ...failedTasks].length

    return {
        allTasksAmount,
        lastCompleted: lastCompletedTaskTime,
        lastCreated: lastCreatedTaskTime,
    };
}