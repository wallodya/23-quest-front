import { checkTask, completeTask, failTask } from "@task/features";
import { useChekTaskMutation, useCompleteTaskMutation, useFailTaskMutation } from "@task/features/taskApi.slice";
import { Task, TaskContext, TaskOptimistic, TaskTimer, isTaskType } from "@task/types";
import { useState } from "react";
import { useTimer } from "react-timer-hook";
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

//TODO combine all task action into this hook
export const useTaskActions = (task: Task): TaskContext["actions"] => {
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
            } //TODO find better way of handling optimisticallty added tasks
        };
    }

    const complete = useTaskComplete(task)
    const fail = useTaskFail(task)
    const check = useTaskCheck(task)
    const [isStarted, setIsStarted] = useState(false)
    const expiresTime = new Date()
    expiresTime.setMilliseconds(expiresTime.getMilliseconds() + (task.duration ?? 1000))
    const timer = useTimer({
        expiryTimestamp: expiresTime,
        onExpire: () => {
            if (task.types.includes("REPEAT") && task.repeatCount && task.repeatCount > 1) {
                check.handleFn()
                setIsStarted(false)
            } else {
                complete.handleFn()
                setIsStarted(false)
            }
        },
        autoStart: false,
    });
    return {
        complete,
        fail,
        check,
        timer: { ...timer, isStarted, setIsStarted}
    }
}