"use client";

import { useAddTaskToQuestMutation } from "@quest/features/questApi.slice";
import { addTask, openTaskForm, setTypes } from "@task/features";
import { useCreateTaskMutation } from "@task/features/taskApi.slice";
import TasksConfig from "@task/tasks.config";
import { TaskFormFields, CreateTaskReqBody, TaskFormSteps, TaskOptimistic, TaskType } from "@task/types";
import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store";

export const useSubmitTask = (isInQuest: boolean, questId?: string) => {

    const dispatch = useAppDispatch();
    const [createTask, { isLoading, isError, error, isSuccess }] =
        useCreateTaskMutation();
    const [addtaskToQuest, {}] = useAddTaskToQuestMutation()

    const submitTask = (payload: TaskOptimistic) => {
        const createTaskReqBody: CreateTaskReqBody = {
            title: payload.title,
            text: payload.text ?? null,
            priority: payload.priority,
            types: payload.types,
            startTime: payload.startTime
                ? new Date(payload.startTime)
                : null,
            endTime: payload.endTime ? new Date(payload.endTime) : null,
            duration: payload.duration ?? null,
            repeatTimes: payload.repeatCount ?? null,
        };
        dispatch(addTask(payload));
        if (!isInQuest) {
            createTask(createTaskReqBody);
        } else {
            addtaskToQuest({ body: createTaskReqBody, questId: questId ?? "" });
        }
    };
    return {
        submitTask
    }
} 

export const useTaskFormControls = (watch: UseFormWatch<TaskFormFields>) => {
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


    // const saveTask = (payload: TaskOptimistic) => {
    //     console.log("Submited");
    //     const createTaskReqBody: CreateTaskReqBody = {
    //         title: payload.title,
    //         text: payload.text ?? undefined,
    //         priority: payload.priority,
    //         types: payload.types,
    //         startTime: payload.startTime
    //             ? new Date(payload.startTime)
    //             : undefined,
    //         endTime: payload.endTime ? new Date(payload.endTime) : undefined,
    //         duration: payload.duration ?? undefined,
    //         repeatTimes: payload.repeatCount ?? undefined,
    //     };
    //     dispatch(addTask(payload));
    //     createTask(createTaskReqBody);
    // };

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
    
    
    const saveTaskTypes = () => {
        dispatch(setTypes(taskTypes));
    };

    return {
        isShown,
        currentStep,
        // typesInForm,
        typesInState,
        openForm,
        // closeForm,
        // setTaskTypes,
        saveTaskTypes,
        // saveTask,
        // setStep
    };
};

export const useSelectedTypesFlags = (types: TaskType) => {
    return {
        isBasic: types.includes("BASIC"),
        isTimer: types.includes("TIMER"),
        isRepeat: types.includes("REPEAT"),
        isPeriodic: types.includes("PERIODIC"),
    }
}

export const useTaskFormNavigation = () => {
    
    return {}
}

export const useFormProgress = () => {
    const { currentStep, types } = useAppSelector(
        (state) => state.tasks.taskForm,
    );
    const { isBasic, isPeriodic, isRepeat, isTimer } = useSelectedTypesFlags(types)
    const MANDATORY_STEPS_AMOUNT = 3;

    const isProgressShown = currentStep !== "title&type";
    const stepsTotal = types.includes("BASIC")
        ? MANDATORY_STEPS_AMOUNT
        : MANDATORY_STEPS_AMOUNT + types.length;
    let currentStepCount: number;
    let nextStep: TaskFormSteps | null
    let previousStep: TaskFormSteps | null
    switch (currentStep) {
        case "title&type": {
            currentStepCount = 1;
            previousStep = null
            nextStep = "description"
            break;
        }
        case "description": {
            currentStepCount = 2;
            previousStep = "title&type"
            nextStep = "priority"
            break;
        }
        case "priority": {
            currentStepCount = 3;
            previousStep = "description"

            if (isTimer) {
                nextStep = "duration"
            } else if (isPeriodic) {
                nextStep = "timeframe"
            } else if (isRepeat) {
                nextStep = "repeatCount"
            } else {
                nextStep = null
            }

            break;
        }
        case "duration": {
            currentStepCount = 4;
            previousStep = "priority"

            if (isPeriodic) {
                nextStep = "timeframe"
            } else if (isRepeat) {
                nextStep = "repeatCount"
            } else {
                nextStep = null
            }

            break;
        }
        case "timeframe": {
            currentStepCount = isTimer ? 5 : 4;
            if (isTimer) {
                previousStep = "duration"
            } else {
                previousStep = "priority"
            }

            if (isRepeat) {
                nextStep = "repeatCount"
            } else {
                nextStep = null
            }

            break;
        }
        case "repeatCount": {
            if (isTimer && isPeriodic) {
                currentStepCount = 6;
            } else if (isTimer || isPeriodic) {
                currentStepCount = 5;
            } else {
                currentStepCount = 4;
            }

            if (isPeriodic) {
                previousStep = "timeframe"
            } else if (isTimer) {
                previousStep = "duration"
            } else {
                previousStep = "priority"
            }
            nextStep = null
            break;
        }
    }
    const allSteps = Object.values(TasksConfig.form.stepNames).filter(
        (stepName) => {
            return (
                stepName === "title&type" ||
                stepName === "description" ||
                stepName === "priority" ||
                (stepName === "duration" && isTimer) ||
                (stepName === "repeatCount" && isRepeat) ||
                (stepName === "timeframe" && isPeriodic)
            );
        },
    );
        // console.log("allSteps: ", allSteps)
    return {
        isProgressShown,
        stepsTotal,
        currentStepCount,
        allSteps,
        nextStep,
        previousStep
    };
};
