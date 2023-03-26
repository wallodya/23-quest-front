import { usePriorityName, usePriorityTextClassNames } from "@task/hooks";
import { TaskPriority } from "@task/types";

export const TaskCardHeader = ({
    taskTitle,
    taskPriority,
}: {
    taskTitle: string;
    taskPriority: TaskPriority;
}) => {
    const priorityName = usePriorityName(taskPriority);
    const priorityTextClassNames = usePriorityTextClassNames(taskPriority);

    return (
        <div className="flex items-baseline justify-between">
            <p className="font-bold">{taskTitle}</p>
            <span className={`text-xs italic ${priorityTextClassNames}`}>
                {priorityName}
            </span>
        </div>
    );
};
