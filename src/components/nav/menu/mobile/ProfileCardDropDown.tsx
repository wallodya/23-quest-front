import { Task } from "@task/types";
import moment, { Moment } from "moment";
import { useAppSelector } from "store";

const ProfileStatsCards = () => {
    const { activeTasks, completedTasks } = useAppSelector(state => state.tasks)
    const { tasksInQuests } = useAppSelector(state => state.quests)
    const tasksDoneTodayAmount: number = completedTasks.filter((task) =>
        moment(task.updatedAt).isBetween(
            moment().startOf("day"),
            moment().endOf("day"),
        ),
    ).length;
    const allActiveTasks = [...tasksInQuests, ...activeTasks];
    console.log("All active tasks length: ", allActiveTasks.length)
    const tasksLeftTodayAmount: number = allActiveTasks.filter(
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
    ).length;
    return (
        <div className="mb-4 grid w-full grid-cols-2 gap-5">
            <div className="flex flex-col items-center gap-1 rounded-lg bg-gradient-to-tr from-indigo-900 to-indigo-600 px-1 py-2">
                <span className="w-full border-b border-slate-300/20 text-center text-3xl font-bold">
                    {tasksDoneTodayAmount}
                </span>
                <span className="text-xs text-slate-300/75">done today</span>
            </div>
            <div className="col-start-2 flex flex-col items-center gap-1 rounded-lg bg-gradient-to-tr from-sky-900 to-sky-600 px-1 py-2">
                <span className="w-full border-b border-slate-300/20 text-center text-3xl font-bold">
                    {tasksLeftTodayAmount}
                </span>
                <span className="text-xs text-slate-300/75">left today</span>
            </div>
        </div>
    );
}

type FindMaxDateOverload = {
    (arr: (Date | string | number | null)[]): Date | null;
    <T=any>(arr: (T | null)[], extractFn: (arg: T | null) => Date | string | number | null): Date | null;
}

const findMaxDate: FindMaxDateOverload = (
    arr: (Date | string | number | null)[],
    extractFn?: (obj: unknown) => Date | string | number | null,
) => {
    const firstDate = extractFn ? extractFn(arr[0]) : arr[0];
    if (firstDate === undefined) {
        return null;
    }

    const getDateValue = (value: number | string| Date | null) => {
        if (value === null) {
            return Number.NEGATIVE_INFINITY
        }

        if (extractFn) {
            const exctractedDate = extractFn(value)

            if (exctractedDate !== null) {
                return new Date(exctractedDate)
            }

            return Number.NEGATIVE_INFINITY
        } else {
            return new Date(value)
        }
    }

    const maxDate = new Date(
        Math.max(
            ...arr.map((i) => Number(getDateValue(i))),
        ),
    );
    return maxDate;
};

const ProfileStats = () => {
    const { quests, tasksInQuests } = useAppSelector(state => state.quests)
    const { completedTasks, activeTasks, failedTasks } = useAppSelector(state => state.tasks)

    const activeQuestsAmount = quests.filter((quest) =>
        tasksInQuests.find(
            (task) => task.uniqueQuestId === quest.uniqueQuestId && !task.isCompleted && !task.isFailed
        ),
    ).length;

    const lastCompletedTaskTime = moment(completedTasks[0]?.updatedAt)
    const lastCompletedTaskInQuestTime = moment(tasksInQuests.filter(task => task.isCompleted).pop()?.updatedAt)



    const lastCreatedTaskTime = moment(findMaxDate<Task>(
        [
            activeTasks[0] ?? null,
            failedTasks[0] ?? null,
            completedTasks[0] ?? null,
        ],
        (task) => task ? task.createdAt : Number.NEGATIVE_INFINITY,
    ));

    const lastCreatedTaskInQuestTime = moment(findMaxDate<Task>(
        tasksInQuests,
        (task) => task ? task.createdAt: Number.NEGATIVE_INFINITY
    ))


    const taskFailedThisWeek = [...tasksInQuests, ...failedTasks].filter(
        (task) =>
            task.isFailed &&
            moment(task.updatedAt).isAfter(moment().startOf("week")),
    ).length;

    return (
        <>
            <ProfileStatsCards />
            {(lastCompletedTaskTime || lastCompletedTaskInQuestTime) && (
                <div className="wrap col-span-3 row-span-1 row-start-4 flex items-center justify-start gap-2 text-gray-400">
                    <span className="col-span-3 row-start-3 text-xs">
                        Last completed:
                    </span>
                    <span className="col-span-3 row-start-4 text-xs italic">
                        {lastCompletedTaskTime.isBefore(
                            lastCompletedTaskInQuestTime,
                        )
                            ? lastCompletedTaskInQuestTime.fromNow()
                            : lastCompletedTaskTime.fromNow()}
                    </span>
                </div>
            )}
            {(lastCreatedTaskTime || lastCreatedTaskInQuestTime) && (
                <div className="wrap col-span-3 row-span-1 row-start-5 flex items-center justify-start gap-2 text-gray-400">
                    <span className="col-span-3 row-start-3 text-xs">
                        Last created:
                    </span>
                    <span className="col-span-3 row-start-4 text-xs italic">
                        {lastCreatedTaskTime.isBefore(
                            lastCreatedTaskInQuestTime,
                        )
                            ? lastCreatedTaskInQuestTime.fromNow()
                            : lastCreatedTaskTime.fromNow()}
                    </span>
                </div>
            )}
            <div className="wrap col-span-3 row-span-1 row-start-5 flex items-center justify-start gap-2 text-gray-400">
                <span className="col-span-3 row-start-3 text-xs">
                    Active quests:
                </span>
                <span className="col-span-3 row-start-4 text-xs italic">
                    {activeQuestsAmount}
                </span>
            </div>
            <div className="wrap col-span-3 row-span-1 row-start-5 flex items-center justify-start gap-2 text-gray-400">
                <span className="col-span-3 row-start-3 text-xs">
                    Task failed this week:
                </span>
                <span className="col-span-3 row-start-4 text-xs italic">
                    {taskFailedThisWeek}
                </span>
            </div>
        </>
    );
}

const ProfileCardDropDown = ({ isShown }: { isShown: boolean }) => {
    return (
        <div
            style={
                isShown
                    ? {
                          height: "fit-content",
                          paddingBlock: "1rem",
                          opacity: 1,
                      }
                    : { height: 0, opacity: 0 }
            }
            className="flex flex-col items-start gap-3 overflow-hidden border-gray-700 px-2 transition-all"
        >
            <ProfileStats/>
            <div className="mt-6 w-full border-b border-gray-700"></div>
        </div>
    );
};

export default ProfileCardDropDown;
