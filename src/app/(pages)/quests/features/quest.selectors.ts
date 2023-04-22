import { RootState } from "store";

export const selectQuestsSlice = () => (state: RootState) => state.quests

export const selectQuestForm = () => (state: RootState) => state.quests.questForm

export const selectAllQuests = () => (state: RootState) => state.quests.quests

export const selectTasksInQuests = () => (state: RootState) => state.quests.tasksInQuests

export const selectTasksForQuest = (questId: string) => (state: RootState) =>
    state.quests.tasksInQuests.filter((task) => task.uniqueQuestId === questId);

export const selectActiveTasksInQuests = () => (state: RootState) =>
    state.quests.tasksInQuests.filter(
        (task) => !task.isFailed && !task.isCompleted,
    );
