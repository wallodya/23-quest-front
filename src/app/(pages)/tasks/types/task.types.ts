import { TaskFormSteps } from "@task/components/Form/steps";
import { FieldErrors, UseFormGetValues, UseFormRegister } from "react-hook-form";
import { string } from "zod";

export type TaskPriority = "NOT_IMPORTANT" | "MEDIUM" | "URGENT";
export type TaskDifficulty = "EASY" | "MEDIUM" | "HARD";
export type BasicTaskType = "BASIC";
export type ModifiedTaskType = "PERIODIC" | "REPEAT" | "TIMER";
// export type TaskType = [BasicTaskType] | ModifiedTaskType[]
export type TaskType = (BasicTaskType | ModifiedTaskType)[];

export type TaskTabs = "active" | "failed" | "completed";

export type TaskFormStep = {
    buttonLabel: string,
    name: string
}

export type TasksConfig = {
    tabs: {
        urlParam: string;
        acitve: {
            name: string;
            urlParamValue: TaskTabs;
        };
        failed: {
            name: string;
            urlParamValue: TaskTabs;
        };
        completed: {
            name: string;
            urlParamValue: TaskTabs;
        };
    };
    form: {
        urlParam: string;
        stepNames: {
            [K: string]: TaskFormSteps
        }, 
        steps: Map<TaskFormSteps, TaskFormStep>
    };
};

export type Task = {
    userId: number;
    uniqueTaskId: string;
    isCompleted: boolean;
    isFailed: boolean;
    title: string;
    text: string | null;
    types: TaskType;
    startTime: number | null;
    endTime: number | null;
    duration: number | null;
    repeatCount: number | null;
    priority: TaskPriority;
    isInQuest: boolean;
    questId: number | null;
    isCurrentInQuest: boolean;
    createdAt: number;
    updatedAt: number;
};

export type CreateTaskBody = Pick<
    Task,
    | "title"
    | "text"
    | "startTime"
    | "endTime"
    | "duration"
    | "repeatCount"
    | "priority"
> & {
    isTimer: boolean,
    isPeriodic: boolean,
    isRepeat: boolean
};

export type TaskFormSteps = "title&type" | "description" | "priority" | "timeframe" | "duration" | "repeatCount"

export type TaskFormState = {
    isOpen: boolean;
    currentStep: TaskFormSteps,
    types: TaskType
} & Partial<CreateTaskBody>;

export type TaskOptimistic = Omit<Task, "userId" | "uniqueTaskId">

export type TasksState = {
    activeTasks: Task[];
    completedTasks: Task[];
    failedTasks: Task[];
    addedTasks: TaskOptimistic[];
    taskForm: TaskFormState;
    refreshedAt: string;
};

export type TaskFiltersState = {
    refreshedAt: string;
};

export type TaskTypeChipProps = {
    label: string;
    textColor: string;
    outlineColor: string;
    Icon: () => JSX.Element;
};

export type TaskStepProps = {
    registerFn: UseFormRegister<CreateTaskBody>;
    errors: FieldErrors<CreateTaskBody>;
    onNext?: () => void,
    onPrevious?: () => void
    // getValuesFn: UseFormGetValues<CreateTaskBody>
}

export const isTaskFormStep = (str: unknown): str is TaskFormSteps  => {
    return (
        typeof str === "string" &&
        (str === "title&type" ||
            str === "description" ||
            str === "priority" ||
            str === "timeframe" ||
            str === "duration" ||
            str === "repeatCount")
    );
}

export const isTaskTabsType = (str: unknown): str is TaskTabs => {
    return (
        typeof str === "string" &&
        str !== null &&
        (str === "active" || str === "failed" || str === "completed")
    );
};

export const isTaskTypeName = (
    str: unknown,
): str is BasicTaskType | ModifiedTaskType => {
    return (
        typeof str !== null &&
        typeof str === "string" &&
        (str === "BASIC" ||
            str === "PERIODIC" ||
            str === "REPEAT" ||
            str === "TIMER")
    );
};

export const isTaskPriorityType = (str: unknown): str is TaskPriority => {
    return (
        str !== null &&
        typeof str === "string" &&
        (str === "NOT_IMPORTANT" || str === "MEDIUM" || str === "URGENT")
    );
};

export const isTaskDifficultyType = (str: unknown): str is TaskPriority => {
    return (
        str !== null &&
        typeof str === "string" &&
        (str === "EASY" || str === "MEDIUM" || str === "HARD")
    );
};

export const isTaskTypeType = (obj: unknown): obj is TaskType => {
    if (obj === null || typeof obj !== "object" || !Array.isArray(obj) || obj.length > 3) {
        return false;
    }
    for (const entry of obj) {
        if (!isTaskTypeName(entry)) {
            return false;
        }
    }
    return true;
};

export const isTaskType = (obj: unknown): obj is Task => {
    return (
        obj !== null &&
        typeof obj === "object" &&
        "uniqueTaskId" in obj &&
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
        "repeatCount" in obj &&
        (typeof obj.repeatCount === "number" || obj.repeatCount === null) &&
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
        typeof obj.createdAt === "number" &&
        "updatedAt" in obj &&
        typeof obj.updatedAt === "number"
    );
};

export const isOptimisticTaskType = (obj: unknown): obj is TaskOptimistic => {
    return (
        obj !== null &&
        typeof obj === "object" &&

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
        "repeatCount" in obj &&
        (typeof obj.repeatCount === "number" || obj.repeatCount === null) &&
        "priority" in obj &&
        isTaskPriorityType(obj.priority) &&

        "isInQuest" in obj &&
        typeof obj.isInQuest === "boolean" &&
        "questId" in obj &&
        (typeof obj.questId === "number" || obj.questId === null) &&
        "isCurrentInQuest" in obj &&
        typeof obj.isCurrentInQuest === "boolean" &&
        "createdAt" in obj &&
        typeof obj.createdAt === "number" &&
        "updatedAt" in obj &&
        typeof obj.updatedAt === "number"
    );
};

