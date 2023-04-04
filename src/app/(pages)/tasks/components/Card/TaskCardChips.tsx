import { useTypeChipProps } from "@task/hooks";
import { TaskType } from "@task/types";
import TaskTypeChip from "./TaskTypeChip";

export const TaskTypeChips = ({ taskTypes }: { taskTypes: TaskType }) => {
    const typeChipsProps = useTypeChipProps(taskTypes);

    if (taskTypes.includes("BASIC")) {
        return null
    }

    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {typeChipsProps.map((chipProps, index) => (
                <TaskTypeChip {...chipProps} key={index} />
            ))}
        </div>
    );
};
