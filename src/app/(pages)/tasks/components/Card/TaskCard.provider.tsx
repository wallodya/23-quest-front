import { $TEST_task } from "@task/features";
import { useTaskTypeFlags, useTaskDescriptionControls, useValidTimePeriod, useTaskActions } from "@task/hooks";
import { Task, TaskContext, TaskOptimistic, isTaskType } from "@task/types";
import React, { ReactNode, createContext, useContext } from "react";
import types from "tailwindcss";

const TaskContext = createContext<TaskContext>({
    task: $TEST_task,
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
            isSuccess: false
        },
        fail: {
            handleFn: () => {},
            isError: false,
            isLoading: false,
            isSuccess: false
        },
        check: {
            handleFn: () => {},
            isError: false,
            isLoading: false,
            isSuccess: false
        },
        timer: {
            setCompleteTimeout: () => {},
            isTimerSet: false,
            timeValues: {
                hours: 0,
                minutes: 0,
                seconds: 0
            }
        }
    },
});
export const useTask = () => useContext(TaskContext)

const TaskProvider = ({
    children,
    task,
}: {
    children: ReactNode;
    task: Task | TaskOptimistic;
}) => {
    const isSaved = isTaskType(task)
    const {isPeriodic, isTimer, isRepeat} = useTaskTypeFlags(task.types)
    const {isExpanded: isDescriptionExpanded, toggleExpanded} = useTaskDescriptionControls()
    const isValidTimePeriod = useValidTimePeriod({
        isPeriodic,
        startTime: task.startTime,
        endTime: task.endTime,
    });
    const areActionsShown = !task.isFailed && !task.isCompleted && isValidTimePeriod
    const actions = useTaskActions(task)
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
        actions
    }
    return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
