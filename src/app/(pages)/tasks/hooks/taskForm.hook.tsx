"use client"

import { DescriptionStep } from "@task/components/Form/steps/Description"
import { DurationStep } from "@task/components/Form/steps/Duration"
import { PriorityStep } from "@task/components/Form/steps/Priority"
import { RepeatCountStep } from "@task/components/Form/steps/RepeatCount"
import { TimeframeStep } from "@task/components/Form/steps/Timeframe"
import { TitleAndTypeStep } from "@task/components/Form/steps/TitleAndType"
import { addTask, closeTaskForm, openTaskForm, setCurrentStep } from "@task/features"
import { CreateTaskBody, Task, TaskFormSteps, TaskStepProps } from "@task/types"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "store"

export const useTaskFormControls = () => {
    const dispatch = useAppDispatch()

    const { isOpen: isShown, currentStep} = useAppSelector(state => state.tasks.taskForm)

    const openForm = () => {
        dispatch(openTaskForm())
    }

    const closeForm = () => {
        dispatch(closeTaskForm())
    }

    const setStep = (step: TaskFormSteps) => {
        dispatch(setCurrentStep(step))
    }

    const saveTask = (payload: Task) => {
        // closeTaskForm()
        // setIsShown(false)
        dispatch(addTask(payload))
    }
    return {
        isShown,
        currentStep,
        openForm,
        closeForm,
        saveTask,
        setStep
    }
}

// export const useNewTaskContainerClasses = (isAdded: boolean) => {
//     if (!isAdded) {
//         return "fixed bottom-0 left-0 w-screen bg-slate-200 dark:bg-slate-700";
//     }

//     return "flex flex-col rounded-xl bg-gray-900 px-5 py-3 shadow shadow-slate-900";
// };

export const useCurrentFormStep = ({
    registerFn,
    errors
}: TaskStepProps) => {
    const { currentStep } = useAppSelector((state) => state.tasks.taskForm);
    switch (currentStep) {
        case "title&type": {
            return () => <TitleAndTypeStep registerFn={registerFn} errors={errors} />;   
        }
        case "description": {
            return () => <DescriptionStep/>
        }
        case "priority": {
            return () => <PriorityStep/>
        }
        case "timeframe": {
            return () => <TimeframeStep/>
        }
        case "duration": {
            return () => <DurationStep/>
        }
        case "repeatCount": {
            return () => <RepeatCountStep/>
        }
    }
};
