import { useQuestCardActions, useQuestCardStats } from "@quest/common/hooks"
import { useGetTasksForQuestQuery } from "@quest/features/questApi.slice"
import { Quest, QuestContext } from "@quest/types"
import { ReactNode, createContext, useContext } from "react"
import { useAppSelector } from "store"

const defaultContextValue: QuestContext = {
    uniqueQuestId: "123",
    title: "quest1",
    description: "description1",
    isStarted: false,
    isCompleted: false,
    isFailed: false,
    userId: "user-123",
    authorId: "user-123",
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
    startedAt: null,
    tasks: [],
    actions: {
        addTask: () => {},
    },
    stats: {
        taskAmount: 0,
        failedTaskAmount: 0,
        completedTaskAmount: 0,
        activeTaskAmount: 0,
        percentageFailed: 0,
        percentageCompleted: 0,
        percentageActive: 0,
        percentageDone: 0,
    }
}

const QuestContext = createContext<QuestContext>(defaultContextValue)
export const useQuest = () => useContext(QuestContext)

export const QuestProvider = ({
    children,
    ...quest
}: Quest & { children: ReactNode }) => {
    const actions = useQuestCardActions(quest.uniqueQuestId)
    const { isLoading } = useGetTasksForQuestQuery(quest.uniqueQuestId)
    const allQuestsTasks = useAppSelector(state => state.quests.tasksInQuests)
    const questTasks = allQuestsTasks.filter(task => task.uniqueQuestId === quest.uniqueQuestId)
    const stats = useQuestCardStats(questTasks)
    const contextValue: QuestContext = {
        ...quest,
        tasks: isLoading ? "loading" : questTasks,
        actions,
        stats,
    };
    return (
        <QuestContext.Provider value={contextValue}>
            {children}
        </QuestContext.Provider>
    );
};
