import { useQuestCardActions } from "@quest/common/hooks"
import { useGetTasksForQuestQuery } from "@quest/features/questApi.slice"
import { Quest, QuestContext } from "@quest/types"
import { ReactNode, createContext, useContext } from "react"

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
}

const QuestContext = createContext<QuestContext>(defaultContextValue)
export const useQuest = () => useContext(QuestContext)

export const QuestProvider = ({
    children,
    ...quest
}: Quest & { children: ReactNode }) => {
    const actions = useQuestCardActions(quest.uniqueQuestId)
    const { data: questTasks, isLoading } = useGetTasksForQuestQuery(quest.uniqueQuestId)
    const contextValue: QuestContext = {
        ...quest,
        tasks: isLoading ? "loading" : questTasks ? questTasks : [],
        actions,
    };
    return (
        <QuestContext.Provider value={contextValue}>
            {children}
        </QuestContext.Provider>
    );
};
