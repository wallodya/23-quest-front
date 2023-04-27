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

const useTaskCardBackgroundClasses = ( isInQuest?: boolean, isFailed?: boolean, isCompleted?:boolean): string => {
    isInQuest ??= false
    isFailed ??= false
    isCompleted ??= false

    if (isInQuest) {
        if (isCompleted || isFailed) {
            return "bg-gray-800 opacity-50"
        }

        return `bg-gray-800`
    }

    if (isCompleted || isFailed) {
        return "bg-gray-900 opacity-50";
    }

    return "bg-gray-900"
}

const TaskCardContainer = ({ children }: { children: ReactNode }) => {
    const { toggleExpanded, task: { isInQuest, isCompleted, isFailed } } = useTask();
    const bgClasses = useTaskCardBackgroundClasses(isInQuest, isFailed, isCompleted)
    return (
        <div
            className={`flex h-full flex-col justify-between rounded-xl px-6 py-5 ${bgClasses} shadow shadow-slate-900`}
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
