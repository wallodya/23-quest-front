"use client"

import { DescriptionStep } from "@task/components/Form/steps/Description"
import { DurationStep } from "@task/components/Form/steps/Duration"
import { PriorityStep } from "@task/components/Form/steps/Priority"
import { RepeatCountStep } from "@task/components/Form/steps/RepeatCount"
import { TimeframeStep } from "@task/components/Form/steps/Timeframe"
import { TitleAndTypeStep } from "@task/components/Form/steps/TitleAndType"
import { addTask, closeTaskForm, openTaskForm, setCurrentStep, setTypes } from "@task/features"
import { CreateTaskBody, Task, TaskFormSteps, TaskStepProps, TaskType } from "@task/types"
import { useEffect, useState } from "react"
import { UseFormWatch } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "store"

export const useTaskFormControls = (watch: UseFormWatch<CreateTaskBody>) => {
    const dispatch = useAppDispatch()

    const { isOpen: isShown, currentStep, types: typesInState} = useAppSelector(state => state.tasks.taskForm)
    // const [typesInForm, setTypesInForm] = useState<TaskType>([])
    let taskTypes = [...typesInState];

    const openForm = () => {
        dispatch(openTaskForm())
    }

    // const closeForm = () => {
    //     dispatch(closeTaskForm())
    // }

    // const setTaskTypes = (types: TaskType) => {
    //     setTypesInForm(types)
    // }
    const saveTaskTypes = () => {
        dispatch(setTypes(taskTypes))
    }

    // const setStep = (step: TaskFormSteps) => {
    //     dispatch(setCurrentStep(step))
    // }

    const saveTask = (payload: Task) => {
        // closeTaskForm()
        // setIsShown(false)
        dispatch(addTask(payload))
    }

    // const watchPeriodic = watch("isPeriodic")
    // const watchTimer = watch("isTimer")
    // const watchRepeat = watch("isRepeat")

    useEffect(() => {
        const { unsubscribe } = watch((values) => {

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
        console.log("taskTypes(effect): ", taskTypes)
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
    }
}

export const useCurrentFormStep = ({
    registerFn,
    errors,
    onNext
}: TaskStepProps) => {
    const { currentStep } = useAppSelector((state) => state.tasks.taskForm);   
    switch (currentStep) {
        case "title&type": {
            return () => <TitleAndTypeStep registerFn={registerFn} errors={errors} onNext={onNext}/>;   
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

// export const useTaskFormTypesState = (
//     watch: UseFormWatch<CreateTaskBody>,
//     setTaskTypes: (types: TaskType) => void,
//     typesInState: TaskType,
// ) => {
//     useEffect(() => {
//         const { unsubscribe } = watch((values) => {
//             let taskTypes = [...typesInState];

//             if (values.isPeriodic) {
//                 taskTypes.push("PERIODIC");
//             } else {
//                 taskTypes = taskTypes.filter((type) => type !== "PERIODIC");
//             }

//             if (values.isRepeat) {
//                 taskTypes.push("REPEAT");
//             } else {
//                 taskTypes = taskTypes.filter((type) => type !== "REPEAT");
//             }

//             if (values.isTimer) {
//                 taskTypes.push("TIMER");
//             } else {
//                 taskTypes = taskTypes.filter((type) => type !== "TIMER");
//             }

//             if (taskTypes.length === 0) {
//                 taskTypes.push("BASIC");
//             }

//             if (taskTypes.length > 1 && taskTypes.includes("BASIC")) {
//                 taskTypes = taskTypes.filter((type) => type !== "BASIC");
//             }

//             setTaskTypes(taskTypes);
//         });
//         return () => {
//             unsubscribe();
//         };
//     }, [watch]);
// };
