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
    const { toggleExpanded, task: { isInQuest } } = useTask();
    return (
        <div
            className={`flex flex-col rounded-xl px-5 py-3 ${isInQuest ? "bg-gray-800" : "bg-gray-900"} shadow shadow-slate-900`}
            onClick={toggleExpanded}
        >
            {children}
        </div>
    );
};

export const TaskCard = (task: Task) => {

    return (
        <TaskProvider task={task}>
            <TaskCardContainer>
                <TaskCardHeader />
                {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(30%,70%))] mt-1 pt-1 border-t border-gray-400/20 text-xs text-gray-400"> */}
                <div className="mt-1 flex flex-wrap justify-between gap-1 border-t border-gray-400/20 pt-1 text-xs text-gray-400">
                    <TaskPeriod />
                    <TaskDuration />
                </div>
                <TaskTypeChips />
                <TaskDescription />
                <div className="mt-4 flex justify-between items-center text-xs">
                    <TaskRepeatCount />
                    <TaskCardActions />
                </div>
            </TaskCardContainer>
        </TaskProvider>
    );
};

//TODO design for BASIC task type
//TODO action buttons
//TODO drag&drop (optional)
