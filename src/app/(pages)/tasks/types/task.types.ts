export type TaskPriority = "NOT_IMPORTANT" | "MEDIUM" | "URGENT"
export type TaskDifficulty = "EASY" | "MEDIUM" | "HARD"
export type BasicTaskType = "BASIC"
export type ModifiedTaskType = "PERIODIC" | "REPEAT" | "TIMER";
export type TaskType = [BasicTaskType] | ModifiedTaskType[]

export type Task = {
    task_id: number;
    userId: number;
    uniqueTaskId: string;
    isCompleted: boolean;
    isFailed: boolean;
    title: string;
    text: string | null;
    types: TaskType,
    startTime: Date | null;
    endTime: Date | null;
    duration: number | null;
    repeatTimes: number | null;
    priority: TaskPriority;
    difficulty: TaskDifficulty;
    isInQuest: boolean;
    questId: number | null;
    isCurrentInQuest: boolean;
    createdAt: Date;
    updatedAt: Date;
}