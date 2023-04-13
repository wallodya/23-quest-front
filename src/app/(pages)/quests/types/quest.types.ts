import { Task } from "@task/types"

export type Quest = {
    uniqueQuestId: string,
    title: string,
    description?: string,
    isStarted: boolean,
    isCompleted: boolean,
    isFailed: boolean,
    userId: string,
    authorId: string,
    createdAt: string,
    updatedAt: string,
    startedAt: string | null,
}

export type QuestContext = Quest & {
    tasks: Task[] | "loading"
    actions: {
        addTask: () => void
    }
    stats: {
        taskAmount: number;
        failedTaskAmount: number;
        completedTaskAmount: number;
        activeTaskAmount: number;
        percentageFailed: number;
        percentageCompleted: number;
        percentageActive: number;
        percentageDone: number;
    }
}

export type CreateQuestBody = {
    title: string
    description: string | null
} 

export type QuestState = {
    quests: Quest[],
    tasksInQuests: Task [],
    questForm: {
        isOpen: boolean
    }
}

export type QuestFormFields = {
    title: string,
    description?: string,
}

export const isQuestType  = (obj: unknown): obj is Quest => {
    return (
        obj !== null &&
        typeof obj === "object" &&
        "title" in obj &&
        typeof obj.title === "string" &&
        "description" in obj &&
        typeof obj.description === "string" &&
        "uniqueQuestId" in obj &&
        typeof obj.uniqueQuestId === "string" &&
        "isStarted" in obj &&
        typeof obj.isStarted === "boolean" &&
        "isCompleted" in obj &&
        typeof obj.isCompleted === "boolean" &&
        "isFailed" in obj &&
        typeof obj.isFailed === "boolean" &&
        "userId" in obj && 
        typeof obj.userId === "string" &&
        "createdAt" in obj &&
        typeof obj.createdAt === "string" &&
        "updatedAt" in obj &&
        typeof obj.updatedAt === "string" &&
        "startedAt" in obj &&
        (typeof obj.startedAt === "string" || obj.startedAt === null)
    );
}

const test = {

    authorId: 1,

    createdAt: "2023-04-12T10:37:04.680Z",
    description: "",
    isCompleted: false,
    isFailed: false,
    isStarted: false,

    quest_id: 6,

    startedAt: null,
    tasks: [],
    title: "create quest test 2",
    uniqueQuestId: "25da73dd-90f1-4eaf-8e74-3f79b95ffb14",
    updatedAt: "2023-04-12T10:37:04.680Z",

    userId: 1,
};
