import {
    useTaskTypeFlags,
    useTaskDescriptionControls,
    useValidTimePeriod,
    useTaskActions,
} from "@task/hooks";
import { Task, TaskContext, TaskOptimistic, isTaskType } from "@task/types";
import React, { ReactNode, createContext, useContext } from "react";
import types from "tailwindcss";

const TaskContext = createContext<TaskContext>({
    task: {
        uuid: "string",
        uniqueTaskId: "string",
        isCompleted: false,
        isFailed: false,
        title: "string",
        text: null,
        types: ["BASIC"],
        startTime: new Date(),
        endTime: new Date(),
        duration: null,
        repeatCount: null,
        priority: "MEDIUM",
        isInQuest: false,
        uniqueQuestId: null, //FIXME replace with uqid string, remove DB numbered ids (PK)
        isCurrentInQuest: false,
        createdAt: String(new Date()),
        updatedAt: String(new Date()),
    },
    isSaved: false,
    areActionsShown: false,
    isValidTimePeriod: false,
    isDescriptionExpanded: false,
    toggleExpanded: () => {},
    isPeriodic: false,
    isTimer: false,
    isRepeat: false,
    actions: {
        complete: {
            handleFn: () => {},
            isError: false,
            isLoading: false,
            isSuccess: false,
        },
        fail: {
            handleFn: () => {},
            isError: false,
            isLoading: false,
            isSuccess: false,
        },
        check: {
            handleFn: () => {},
            isError: false,
            isLoading: false,
            isSuccess: false,
        },
        timer: {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            isRunning: false,
            isStarted: false,
            setIsStarted: () => {},
            start: () => {},
            pause: () => {},
            restart: () => {},
            resume: () => {},
        },
    },
});
export const useTask = () => useContext(TaskContext);

const TaskProvider = ({
    children,
    task,
}: {
    children: ReactNode;
    task: Task;
}) => {
    const isSaved = isTaskType(task);
    const { isPeriodic, isTimer, isRepeat } = useTaskTypeFlags(task.types);
    const { isExpanded: isDescriptionExpanded, toggleExpanded } =
        useTaskDescriptionControls();
    const isValidTimePeriod = useValidTimePeriod({
        isPeriodic,
        startTime: task.startTime,
        endTime: task.endTime,
    });
    const areActionsShown =
        !task.isFailed && !task.isCompleted && isValidTimePeriod;
    const actions = useTaskActions(task);
    const contextValue = {
        task,
        isSaved,
        areActionsShown,
        isValidTimePeriod,
        isDescriptionExpanded,
        toggleExpanded,
        isPeriodic,
        isTimer,
        isRepeat,
        actions,
    };
    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
