import { Task } from "@task/types";
import moment from "moment";

export const getTodayTasks = (tasks: Task[]) => {
    return tasks.filter(
        (task) => {
            const { isCompleted, isFailed } = task
            const isPeriodic = task.types.includes("PERIODIC")
            const startedBeforeDayEnd = moment(task.startTime).isBefore(
                moment().endOf("day"),
            )
            const endedBeforeToday = moment(task.endTime).isBefore(
                moment().endOf("day")
            )
                
            const shouldBeDoneToday =
                (!isPeriodic || (startedBeforeDayEnd && !endedBeforeToday)) &&
                !isCompleted &&
                !isFailed;

            return shouldBeDoneToday;
        }
    )
}