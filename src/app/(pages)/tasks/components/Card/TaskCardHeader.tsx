import { usePriorityName, usePriorityTextClassNames } from "@task/hooks";
import { TaskPriority } from "@task/types";
import { useTask } from "./TaskCard.provider";

export const TaskCardHeader = () => {
    const {
        task: { title, priority },
    } = useTask();
    const priorityName = usePriorityName(priority);
    const priorityTextClassNames = usePriorityTextClassNames(priority);

    return (
        <div className="flex items-baseline justify-between">
            <p className="font-bold">{title}</p>
            <span className={`text-xs italic ${priorityTextClassNames}`}>
                {priorityName}
            </span>
        </div>
    );
};
