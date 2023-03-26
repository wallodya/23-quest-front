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

export const isTaskTabsType = (str: string | null): str is TaskTabs => {
    return str !== null && (str === "active" || str === "failed" || str === "completed")
}