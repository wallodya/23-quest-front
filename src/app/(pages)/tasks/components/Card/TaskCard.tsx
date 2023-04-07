import {
    useTaskDescriptionControls,
    useTaskTypeFlags,
    useValidTimePeriod,
} from "@task/hooks";
import { Task, TaskOptimistic, isTaskType } from "@task/types";
import { TaskTypeChips } from "./TaskCardChips";
import { TaskCardHeader } from "./TaskCardHeader";
import { TaskDescription } from "./TaskDescription";
import { TaskDuration } from "./TaskDuration";
import { TaskPeriod } from "./TaskPeriod";
import { TaskRepeatCount } from "./TaskRepeatCount";
import TaskCardActions from "./TaskCardActions";
import TaskProvider, { useTask } from "./TaskCard.provider";
import { ReactNode } from "react";

const TaskCardContainer = ({ children }: { children: ReactNode }) => {
    const { toggleExpanded } = useTask();
    return (
        <div
            className="flex flex-col rounded-xl bg-gray-900 px-5 py-3 shadow shadow-slate-900"
            onClick={toggleExpanded}
        >
            {children}
        </div>
    );
};

export const TaskCard = (task: Task) => {
    if (isTaskType(task) && task.types.includes("TIMER")) {
        // console.log("task: ", task.title)
    }
    return (
        <TaskProvider task={task}>
            <TaskCardContainer>
                <TaskCardHeader />
                <div className="flex justify-between">
                    <TaskDuration />
                    <TaskRepeatCount />
                </div>
                <TaskTypeChips/>
                <TaskDescription
                />
                <TaskCardActions
                />
                <TaskPeriod
                />
            </TaskCardContainer>
        </TaskProvider>
    );
};

//TODO design for BASIC task type
//TODO action buttons
//TODO drag&drop (optional)
