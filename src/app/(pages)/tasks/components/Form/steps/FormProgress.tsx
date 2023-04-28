import { setCurrentStep } from "@task/features";
import { useFormProgress } from "@task/hooks";
import TasksConfig from "@task/tasks.config";
import { TaskFormSteps } from "@task/types";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store";
import { CreateTaskSchemaT } from "../createTask.schema";

const formStepNamesMap = new Map<TaskFormSteps, string>([
    ["title&type", "Name"],
    ["description", "About"],
    ["priority", "Priority"],
    ["timeframe", "Time"],
    ["duration", "Duration"],
    ["repeatCount", "Repeats"],
]);

const useProgressLabelState = (stepNumber: number, formControls: UseFormReturn<CreateTaskSchemaT, any>) => {
    const { formState: { errors, touchedFields} } = formControls
    // const [isDirty, setIsDirty] = useState(false)
    // const [isTouched, setIsTouched] = useState(false)
    const isDirty =
        (stepNumber === 1 && errors.title) ||
        (stepNumber === 2 && errors.text) ||
        (stepNumber === 3 && errors.priority) ||
        (stepNumber === 4 && (errors.durationSeconds || errors.durationMinutes || errors.durationHours)) ||
        (stepNumber === 5 && (errors.startTime || errors.endTime)) ||
        (stepNumber === 6 && errors.repeatCount);
    const isTouched =
        (stepNumber === 1 && touchedFields.title) ||
        (stepNumber === 2 && touchedFields.text) ||
        (stepNumber === 3 && touchedFields.priority) ||
        (stepNumber === 4 && (errors.durationSeconds || errors.durationMinutes || errors.durationHours)) ||
        (stepNumber === 5 &&
            (touchedFields.startTime || touchedFields.endTime)) ||
        (stepNumber === 6 && touchedFields.repeatCount);
    return {
        isDirty,
        isTouched
    }
}

const ProgressDivider = () => {
    return (
        <div className="flex h-7 w-full flex-col items-center justify-center">
            <div className="w-full border border-sky-500/50"></div>
        </div>
    );
};

const StepLabel = ({ stepName }: { stepName: TaskFormSteps }) => {
    return (
        <div className={"translate-x-[-0.05rem] rotate-12 text-xs"}>
            {formStepNamesMap.get(stepName)}
        </div>
    );
};

const Step = ({
    step,
    stepNumber,
    formControls
}: {
    step: TaskFormSteps;
    stepNumber: number;
    formControls: UseFormReturn<CreateTaskSchemaT, any>
}) => {
    const dispatch = useAppDispatch();
    const { currentStepCount, stepsTotal, allSteps } =
        useFormProgress();
    const handleSwitchStep = (to: TaskFormSteps) => {
        dispatch(setCurrentStep(to));
    };
    const { isDirty, isTouched } = useProgressLabelState(stepNumber, formControls)

    const circleBorderClass = !isTouched
        ? "border-sky-500/40"
        : "border-sky-500";

    return (
        <>
            {stepNumber !== 1 && <ProgressDivider/>}
            <div
                className="flex cursor-pointer flex-col items-center gap-1 transition  hover:border-sky-300 hover:text-sky-300"
                onClick={() => handleSwitchStep(step)}
            >
                <div
                    className={`${
                        currentStepCount === stepNumber &&
                        "bg-sky-500 text-slate-200"
                    } relative flex h-7 w-7 items-center justify-center rounded-full border-2 ${circleBorderClass} text-sm font-bold`}
                >
                    {stepNumber}
                    {
                        isDirty &&  (
                            <div
                                className="absolute top-[-4px] right-[-4px] w-3 h-3 rounded-full bg-red-400"
                            ></div>
                        )
                    }
                </div>
                <StepLabel stepName={step} />
            </div>
        </>
    );
};

const FormProgress = ({
    formControls,
}: {
    formControls: UseFormReturn<CreateTaskSchemaT, any>;
}) => {
    // const { currentStep } = useAppSelector(state => state.tasks.taskForm)
    const { isProgressShown, allSteps } = useFormProgress();
    return (
        <div className="text-sky-500">
            {true && (
                <div className="grid grid-cols-11 gap-1">
                    {allSteps.map((step, index) => (
                        <Step
                            formControls={formControls}
                            step={step}
                            stepNumber={index + 1}
                            key={`step-${index}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FormProgress;
