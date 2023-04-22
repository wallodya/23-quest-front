import { selectActiveTasksInQuests } from "@quest/features";
import { selectActiveTasks, selectCompletedTasks, selectCompletedToday } from "@task/features";
import { getTodayTasks } from "@task/utils";
import moment from "moment";
import { useAppSelector } from "store";

const useTodayTaskInfo = () => {
    const tasksDoneToday = useAppSelector(selectCompletedToday())
    const activeTasks = useAppSelector(selectActiveTasks())
    const tasksInQuests = useAppSelector(selectActiveTasksInQuests())

    const tasksLeftTodayAmount = getTodayTasks([
        ...tasksInQuests,
        ...activeTasks,
    ]);

    return {
        doneToday: tasksDoneToday,
        leftToday: tasksLeftTodayAmount
    }
}

export const ProfileStatsCards = () => {
    const { doneToday, leftToday } = useTodayTaskInfo()
    return (
        <div className="mb-4 grid w-full grid-cols-2 gap-5">
            <div className="flex flex-col items-center gap-1 rounded-lg bg-gradient-to-tr from-indigo-900 to-indigo-600 px-1 py-2">
                <span className="w-full border-b border-slate-300/20 text-center text-3xl font-bold">
                    {doneToday.length}
                </span>
                <span className="text-xs text-slate-300/75">done today</span>
            </div>
            <div className="col-start-2 flex flex-col items-center gap-1 rounded-lg bg-gradient-to-tr from-sky-900 to-sky-600 px-1 py-2">
                <span className="w-full border-b border-slate-300/20 text-center text-3xl font-bold">
                    {leftToday.length}
                </span>
                <span className="text-xs text-slate-300/75">left today</span>
            </div>
        </div>
    );
}
