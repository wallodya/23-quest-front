import { selectQuestsSlice } from "@quest/features";
import { Task } from "@task/types";
import { findMaxDate } from "common/utils";
import moment from "moment";
import { useAppSelector } from "store";

export const useQuestsStats = () => {
    const { quests, tasksInQuests } = useAppSelector(selectQuestsSlice())

    const activeQuestsAmount = quests.filter((quest) =>
        tasksInQuests.find(
            (task) => task.uniqueQuestId === quest.uniqueQuestId && !task.isCompleted && !task.isFailed
        ),
    ).length;

    const lastCompletedTaskInQuestTime = moment(tasksInQuests.filter(task => task.isCompleted).pop()?.updatedAt)

    const lastCreatedTaskInQuestTime =
        tasksInQuests.length > 0
            ? moment(
                  findMaxDate<Task>(tasksInQuests, (task) =>
                      task ? task.createdAt : Number.NEGATIVE_INFINITY,
                  ),
              )
            : null;

    return {
        activeQuestsAmount,
        lastCompletedTaskInQuestTime,
        lastCreatedTaskInQuestTime
    }
}
