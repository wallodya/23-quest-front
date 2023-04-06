import { checkTask, completeTask, failTask, removeTimer, setTimer } from "@task/features";
import { useChekTaskMutation, useCompleteTaskMutation, useFailTaskMutation } from "@task/features/taskApi.slice";
import { Task, TaskOptimistic, TaskTimer, isTaskType } from "@task/types";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store";

// TODO add mutations
export const useTaskComplete = (task: Task) => {
    const [completeTaskReq, { isLoading, isError, error, isSuccess }] =
        useCompleteTaskMutation();
    const dispatch = useAppDispatch()
    const handleFn = () => {
        dispatch(completeTask(task))
        completeTaskReq(task.uniqueTaskId)
    }
    return {
        handleFn,
        isError,
        error,
        isLoading,
        isSuccess
    }
}

//TODO add mutations
export const useTaskFail = (task: Task) => {
    const [failTaskReq, {isLoading, isError, error, isSuccess }] = useFailTaskMutation()
    const dispatch=  useAppDispatch()
    const handleFn = () => {
        dispatch(failTask(task))
        failTaskReq(task.uniqueTaskId)
    }
    return {
        handleFn,
        isLoading,
        isError,
        error,
        isSuccess,
    };
}

//TODO add mutations
export const useTaskCheck = (task: Task) => {
    const [checkTaskReq, {isLoading, isError, error, isSuccess}] = useChekTaskMutation()
    const dispatch=  useAppDispatch()
    const handleFn = () => {
        dispatch(checkTask(task))
        checkTaskReq(task.uniqueTaskId)
    }
    return {
        handleFn,
        isLoading,
        isError,
        error,
        isSuccess,
    };
}

export const useTaskTimer = (task: Task) => {
    const MS_SECOND = 1000
    const MS_MINUTE = MS_SECOND * 60
    const MS_HOUR = MS_MINUTE * 60

    const { handleFn: handleCheck } = useTaskCheck(task)
    const { handleFn: handleComplete} = useTaskComplete(task)

    const dispatch = useAppDispatch()
    const timers = useAppSelector(state => state.tasks.timers)

    const timerInState = timers.find(timer => timer.taskId === task.uniqueTaskId)

    const [timeValues, setTimeValues] = useState<{
        hours: number;
        minutes: number;
        seconds: number;
    }>({
        hours: 10,
        minutes: 10,
        seconds: 10,
    });

    const setCompleteTimeout = () => {
        const newTimer: TaskTimer = {
            taskId: task.uniqueTaskId,
            timerSetTime: Number(new Date()),
            timerFinishTime: Number(new Date()) + (task.duration ?? 1000)
        }
        dispatch(setTimer({ task, timer: newTimer }));
        const taskDuration = task.duration ?? MS_SECOND
        const timeoutMs = !!timerInState ? timerInState.timerFinishTime - Number(new Date()) : taskDuration 
        console.log("setting timeout")
        setTimeout(() => {
            if (
                task.types.includes("REPEAT") &&
                task.repeatCount &&
                task.repeatCount > 1
                ) {
                    // TODO change to const reference
                    handleCheck();
            } else {
                handleComplete();
            }
            dispatch(removeTimer(task.uniqueTaskId));
        }, timeoutMs);
        let msLeft = timeoutMs
        while (msLeft >= MS_SECOND) {
            setTimeout(() => {
                msLeft -= MS_SECOND
                const hoursLeft = Math.floor(msLeft / MS_HOUR)
                const minutesLeft = Math.floor((msLeft - MS_HOUR * hoursLeft) / MS_MINUTE)
                const secondsLeft = Math.floor((msLeft - (MS_HOUR * hoursLeft + MS_MINUTE * minutesLeft)) / MS_SECOND)
                setTimeValues((values) => ({
                    hours: hoursLeft,
                    minutes: minutesLeft,
                    seconds: secondsLeft,
                }));
            }, MS_SECOND)
        }
    }
    return {
        setCompleteTimeout,
        isTimerSet: !!timerInState,
        timeValues
    }
}

//TODO combine all task action into this hook
export const useTaskActions = (task: Task | TaskOptimistic) => {
    if (!isTaskType(task)) {
        return {
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
                setCompleteTimeout: () => {},
                isTimerSet: false,
                timeValues: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                }
            }
        };
    }

    const complete = useTaskComplete(task)
    const fail = useTaskFail(task)
    const check = useTaskCheck(task)
    const timer = useTaskTimer(task)
    return {
        complete,
        fail,
        check,
        timer
    }
}