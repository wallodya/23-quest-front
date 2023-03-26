import { TaskPriority } from "@task/types";

const priorityNameMap = new Map<TaskPriority, string>([
    ["NOT_IMPORTANT", ""],
    ["MEDIUM", "medium"],
    ["URGENT", "urgent"],
]);

export const usePriorityTextClassNames = (priority: TaskPriority) => {
    switch (priority) {
        case "MEDIUM": {
            return "text-sky-700";
        }
        case "NOT_IMPORTANT": {
            return "hidden";
        }
        case "URGENT": {
            return "text-red-500";
        }
    }
};

export const usePriorityName = (priority: TaskPriority) => {
    return priorityNameMap.get(priority);
};
