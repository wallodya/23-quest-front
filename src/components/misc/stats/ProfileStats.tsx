import { useQuestsStats } from "@quest/common/hooks";
import { useTasksStats } from "@task/hooks";
import moment from "moment";
import { useAppSelector } from "store";
import { ProfileStatsCards } from "./ProfileStatsCards";

export const useProfileStats = () => {
    const {
        activeQuestsAmount,
        lastCompletedTaskInQuestTime,
        lastCreatedTaskInQuestTime,
    } = useQuestsStats();
    const {
        lastCompleted: lastCompletedTaskTime,
        lastCreated: lastCreatedTaskTime,
        allTasksAmount,
    } = useTasksStats();

    const { tasksInQuests } = useAppSelector(state => state.quests)
    const { failedTasks } = useAppSelector(state => state.tasks)

    let lastCompletedFromNow: string | null = null;

    if (!lastCompletedTaskInQuestTime && !lastCompletedTaskTime) {
        lastCompletedFromNow = null
    } else if (!lastCompletedTaskInQuestTime && lastCompletedTaskTime) {
        lastCompletedFromNow = lastCompletedTaskTime.fromNow()
    } else if (!lastCompletedTaskTime && lastCompletedTaskInQuestTime) {
        lastCompletedFromNow = lastCompletedTaskInQuestTime.fromNow()
    } else if (lastCompletedTaskInQuestTime && lastCompletedTaskTime) {
    lastCompletedFromNow = lastCompletedTaskTime.isBefore(
        lastCompletedTaskInQuestTime,
    )
        ? lastCompletedTaskInQuestTime.fromNow()
        : lastCompletedTaskTime.fromNow();
    }
    
    let lastCreatedFromNow: string | null = null;

    if (!lastCreatedTaskInQuestTime && !lastCreatedTaskTime) {
        lastCreatedFromNow = null
    } else if (!lastCreatedTaskTime && lastCreatedTaskInQuestTime) {
        lastCreatedFromNow = lastCreatedTaskInQuestTime.fromNow()
    } else if (!lastCreatedTaskInQuestTime && lastCreatedTaskTime) {
        lastCreatedFromNow = lastCreatedTaskTime?.fromNow()
    } else if (lastCreatedTaskInQuestTime && lastCreatedTaskTime){
        lastCreatedFromNow = lastCreatedTaskTime.isBefore(
            lastCreatedTaskInQuestTime,
        )
            ? lastCreatedTaskInQuestTime.fromNow()
            : lastCreatedTaskTime.fromNow()
    }

    const taskFailedThisWeek = [...tasksInQuests, ...failedTasks].filter(
        (task) =>
            task.isFailed &&
            moment(task.updatedAt).isAfter(moment().startOf("week")),
    ).length;

    return {
        activeQuestsAmount,
        allTasksAmount,
        lastCompletedFromNow,
        lastCreatedFromNow,
        failedThisWeek: taskFailedThisWeek,
    }
}

export const ProfileStats = () => {
    const {
        activeQuestsAmount,
        lastCompletedFromNow,
        lastCreatedFromNow,
        failedThisWeek
    } = useProfileStats()

    return (
        <>
            <ProfileStatsCards />
            {lastCompletedFromNow && (
                    <div className="wrap col-span-3 row-span-1 row-start-4 flex items-center justify-start gap-2 text-gray-400">
                        <span className="col-span-3 row-start-3 text-xs">
                            Last completed:
                        </span>
                        <span className="col-span-3 row-start-4 text-xs italic">
                            {lastCompletedFromNow}
                        </span>
                    </div>
                )}
            { lastCreatedFromNow && (
                    <div className="wrap col-span-3 row-span-1 row-start-5 flex items-center justify-start gap-2 text-gray-400">
                        <span className="col-span-3 row-start-3 text-xs">
                            Last created:
                        </span>
                        <span className="col-span-3 row-start-4 text-xs italic">
                            {lastCreatedFromNow}
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
                    {failedThisWeek}
                </span>
            </div>
        </>
    );
}