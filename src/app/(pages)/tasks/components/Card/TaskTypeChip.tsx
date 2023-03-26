import { basicChipProps } from "@task/hooks";
import { TaskTypeChipProps } from "@task/types";
import React from "react";

const TaskTypeChip = ({
    label,
    textColor,
    outlineColor,
    Icon
}: TaskTypeChipProps) => {
    if (label === basicChipProps.label) {
        return null;
    }
    return (
        <div
            className={`px-2 py-1 flex gap-2 justify-between items-center ${textColor} rounded-full border text-xs ${outlineColor}`}
        >   
            <Icon/>
            {label}
        </div>
    );
};

export default TaskTypeChip;
