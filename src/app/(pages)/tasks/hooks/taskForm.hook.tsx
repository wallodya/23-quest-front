"use client";

import { useAddTaskToQuestMutation } from "@quest/features/questApi.slice";
import { addTask, openTaskForm, setTypes } from "@task/features";
import { useCreateTaskMutation } from "@task/features/taskApi.slice";
import TasksConfig from "@task/tasks.config";
import { CreateTaskBody, CreateTaskReqBody, TaskOptimistic } from "@task/types";
import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store";

export const useSubmitTask = (isInQuest: boolean, questId?: string) => {

    const dispatch = useAppDispatch();
    const [createTask, { isLoading, isError, error, isSuccess }] =
        useCreateTaskMutation();
    const [addtaskToQuest, {}] = useAddTaskToQuestMutation()

    const submitTask = (payload: TaskOptimistic) => {
        console.log("Submited");
        const createTaskReqBody: CreateTaskReqBody = {
            title: payload.title,
            text: payload.text ?? undefined,
            priority: payload.priority,
            types: payload.types,
            startTime: payload.startTime
                ? new Date(payload.startTime)
                : undefined,
            endTime: payload.endTime ? new Date(payload.endTime) : undefined,
            duration: payload.duration ?? undefined,
            repeatTimes: payload.repeatCount ?? undefined,
        };
        dispatch(addTask(payload));
        if (!isInQuest) {
            createTask(createTaskReqBody);
        } else {
            console.log("adding task to quest: ", createTaskReqBody)
            addtaskToQuest({ body: createTaskReqBody, questId: questId ?? "" });
        }
    };
    return {
        submitTask
    }
} 

export const useTaskFormControls = (watch: UseFormWatch<CreateTaskBody>) => {
    const dispatch = useAppDispatch();
    const [createTask, { isLoading, isError, error, isSuccess }] =
        useCreateTaskMutation();

    const {
        isOpen: isShown,
        currentStep,
        types: typesInState,
    } = useAppSelector((state) => state.tasks.taskForm);

    let taskTypes = [...typesInState];

    const openForm = () => {
        dispatch(openTaskForm());
    };

    const saveTaskTypes = () => {
        dispatch(setTypes(taskTypes));
    };

    const saveTask = (payload: TaskOptimistic) => {
        console.log("Submited");
        const createTaskReqBody: CreateTaskReqBody = {
            title: payload.title,
            text: payload.text ?? undefined,
            priority: payload.priority,
            types: payload.types,
            startTime: payload.startTime
                ? new Date(payload.startTime)
                : undefined,
            endTime: payload.endTime ? new Date(payload.endTime) : undefined,
            duration: payload.duration ?? undefined,
            repeatTimes: payload.repeatCount ?? undefined,
        };
        dispatch(addTask(payload));
        createTask(createTaskReqBody);
    };

    useEffect(() => {
        const { unsubscribe } = watch((values) => {
            // console.log("title", values.title)
            if (values.isPeriodic) {
                !taskTypes.includes("PERIODIC") && taskTypes.push("PERIODIC");
            } else {
                taskTypes = taskTypes.filter((type) => type !== "PERIODIC");
            }

            if (values.isRepeat) {
                !taskTypes.includes("REPEAT") && taskTypes.push("REPEAT");
            } else {
                taskTypes = taskTypes.filter((type) => type !== "REPEAT");
            }

            if (values.isTimer) {
                !taskTypes.includes("TIMER") && taskTypes.push("TIMER");
            } else {
                taskTypes = taskTypes.filter((type) => type !== "TIMER");
            }

            if (taskTypes.length === 0) {
                taskTypes.push("BASIC");
            }

            if (taskTypes.length > 1 && taskTypes.includes("BASIC")) {
                taskTypes = taskTypes.filter((type) => type !== "BASIC");
            }
        });
        return () => {
            unsubscribe();
        };
    });

    return {
        isShown,
        currentStep,
        // typesInForm,
        typesInState,
        openForm,
        // closeForm,
        // setTaskTypes,
        saveTaskTypes,
        saveTask,
        // setStep
    };
};

export const useTaskFormNavigation = () => {
    
    return {}
}

export const useFormProgress = () => {
    const { currentStep, types } = useAppSelector(
        (state) => state.tasks.taskForm,
    );
    const MANDATORY_STEPS_AMOUNT = 3;

    const isProgressShown = currentStep !== "title&type";
    const stepsTotal = types.includes("BASIC")
        ? MANDATORY_STEPS_AMOUNT
        : MANDATORY_STEPS_AMOUNT + types.length;
    let currentStepCount: number;
    switch (currentStep) {
        case "title&type": {
            currentStepCount = 1;
            break;
        }
        case "description": {
            currentStepCount = 2;
            break;
        }
        case "priority": {
            currentStepCount = 3;
            break;
        }
        case "duration": {
            currentStepCount = 4;
            break;
        }
        case "timeframe": {
            currentStepCount = types.includes("TIMER") ? 5 : 4;
            break;
        }
        case "repeatCount": {
            if (types.includes("TIMER") && types.includes("PERIODIC")) {
                currentStepCount = 6;
            } else if (types.includes("TIMER") || types.includes("PERIODIC")) {
                currentStepCount = 5;
            } else {
                currentStepCount = 4;
            }
            break;
        }
    }
    const allSteps = Object.values(TasksConfig.form.stepNames).filter(
        (stepName) => {
            return (
                stepName === "title&type" ||
                stepName === "description" ||
                stepName === "priority" ||
                (stepName === "duration" && types.includes("TIMER")) ||
                (stepName === "repeatCount" && types.includes("REPEAT")) ||
                (stepName === "timeframe" && types.includes("PERIODIC"))
            );
        },
    );

    return {
        isProgressShown,
        stepsTotal,
        currentStepCount,
        allSteps,
    };
};
