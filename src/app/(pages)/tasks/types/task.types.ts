export type TaskPriority = "NOT_IMPORTANT" | "MEDIUM" | "URGENT"
export type TaskDifficulty = "EASY" | "MEDIUM" | "HARD"
export type BasicTaskType = "BASIC"
export type ModifiedTaskType = "PERIODIC" | "REPEAT" | "TIMER";
// export type TaskType = [BasicTaskType] | ModifiedTaskType[]
export type TaskType = (BasicTaskType | ModifiedTaskType)[]

export type TaskTabs = "active" | "failed" | "completed"

export type TasksConfig = {
    tabs: {
        urlParam: string,
        acitve: {
            name: string,
            urlParamValue: TaskTabs
        },
        failed: {
            name: string,
            urlParamValue: TaskTabs
        },
        completed: {
            name: string,
            urlParamValue: TaskTabs
        }
    },
    form: {
        urlParam: string
    }
}

export type Task = {
    task_id: number;
    userId: number;
    uniqueTaskId: string;
    isCompleted: boolean;
    isFailed: boolean;
    title: string;
    text: string | null;
    types: TaskType,
    startTime: number | null;
    endTime: number | null;
    duration: number | null;
    repeatTimes: number | null;
    priority: TaskPriority;
    difficulty: TaskDifficulty;
    isInQuest: boolean;
    questId: number | null;
    isCurrentInQuest: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TasksState = {
    activeTasks: Task[]
    completedTasks: Task[]
    failedTasks: Task[]
    addedTasks: Task[]
    refreshedAt: string;
}

export type TaskFiltersState = {
    refreshedAt: string
}

export type TaskTypeChipProps = {
    label: string;
    textColor: string;
    outlineColor: string;
    Icon: () => JSX.Element;
}

export const isTaskTabsType = (str: unknown): str is TaskTabs => {
    return typeof str === "string" && str !== null && (str === "active" || str === "failed" || str === "completed")
}

export const isTaskTypeName = (str: unknown): str is BasicTaskType | ModifiedTaskType => {
    return typeof str !== null && typeof str === "string" && (str === "BASIC" || str === "PERIODIC" || str === "REPEAT" || str === "TIMER")
}

export const isTaskPriorityType = (str: unknown): str is TaskPriority => {
    return str !== null && typeof str === "string" && (str === "NOT_IMPORTANT" || str === "MEDIUM" || str === "URGENT")
}

export const isTaskDifficultyType = (str: unknown): str is TaskPriority => {
    return str !== null && typeof str === "string" && (str === "EASY" || str === "MEDIUM" || str === "HARD")
}

export const isTaskTypeType = (obj: unknown): obj is TaskType => {
    if (obj === null || typeof obj !== "object" || !Array.isArray(obj)) {
        return false
    }
    for (const entry of obj) {
        if (!isTaskTypeName(entry)) {
            return false
        }
    }
    return true
}

export const isTaskType = (obj: unknown): obj is Task => {
    return obj !== null && typeof obj === "object" && "uniqueTaskId" in obj &&
    typeof obj.uniqueTaskId === "string" &&
    "isCompleted" in obj &&
    typeof obj.isCompleted === "boolean" &&
    "isFailed" in obj &&
    typeof obj.isFailed === "boolean" &&
    "title" in obj &&
    typeof obj.title === "string" &&
    "text" in obj &&
    typeof obj.text === "string" &&
    "types" in obj &&
    isTaskTypeType(obj.types) &&
    "startTime" in obj &&
    (typeof obj.startTime === "number" || obj.startTime === null) &&
    "endTime" in obj &&
    (typeof obj.endTime === "number" || obj.endTime === null) &&
    "duration" in obj &&
    (typeof obj.duration === "number" || obj.duration === null) &&
    "repeatTimes" in obj &&
    (typeof obj.repeatTimes === "number" || obj.repeatTimes === null) &&
    "priority" in obj &&
    isTaskPriorityType(obj.priority) &&
    "difficulty" in obj &&
    isTaskDifficultyType(obj.difficulty) &&
    "isInQuest" in obj &&
    typeof obj.isInQuest === "boolean" &&
    "questId" in obj &&
    (typeof obj.questId === "number" || obj.questId === null) &&
    "isCurrentInQuest" in obj &&
    typeof obj.isCurrentInQuest === "boolean" &&
    "createdAt" in obj &&
    typeof obj.createdAt === "string" &&
    "updatedAt" in obj &&
    typeof obj.updatedAt === "string"
}
