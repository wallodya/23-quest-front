import { setCurrentStep } from "@task/features";
import { useFormProgress } from "@task/hooks";
import TasksConfig from "@task/tasks.config";
import { TaskFormSteps } from "@task/types";
import React from "react";
import { useAppDispatch, useAppSelector } from "store";

const formStepNamesMap = new Map<TaskFormSteps, string>([
    ["title&type", "Name"],
    ["description", "About"],
    ["priority", "Priority"],
    ["timeframe", "Time"],
    ["duration", "Duration"],
    ["repeatCount", "Repeats"],
]);

const StepLabel = ({stepName} : {stepName: TaskFormSteps}) => {
    return (
        <div className={"translate-x-[-0.05rem] rotate-12 text-xs"}>
            {formStepNamesMap.get(stepName)}
        </div>
    );
}

const ProgressDivider = () => {
    return (
        <div className="flex h-7 w-full flex-col items-center justify-center">
            <div className="w-full border border-sky-500/50"></div>
        </div>
    );
}

const FormProgress = () => {
    const { currentStep } = useAppSelector((state) => state.tasks.taskForm);
    const dispatch = useAppDispatch();
    const { isProgressShown, currentStepCount, stepsTotal, allSteps } =
        useFormProgress();
    const handleSwitchStep = (to: TaskFormSteps) => {
        dispatch(setCurrentStep(to));
    };
    return (
        <div className="mb-auto text-sky-500">
            {isProgressShown && (
                // <div className="flex justify-between gap-1">
                <div className="grid grid-cols-11 gap-1">
                    {/* {currentStepCount}/{stepsTotal} */}
                    {allSteps.map((step, index) => (
                        <>
                            {
                                index !== 0 && (
                                    <div className="h-7 w-full flex flex-col justify-center items-center">
                                        <div className="w-full border border-sky-500/50"></div>
                                    </div>
                                )
                            }
                            <div
                                className="flex cursor-pointer flex-col items-center gap-1 transition  hover:border-sky-300 hover:text-sky-300"
                                key={index}
                                onClick={() => handleSwitchStep(step)}
                            >
                                <div
                                    className={`${
                                        currentStepCount === index + 1 &&
                                        "bg-sky-500/75 text-slate-200"
                                    } flex h-7 w-7 items-center justify-center rounded-full border border-sky-500 text-sm font-bold`}
                                >
                                    {index + 1}
                                </div>
                                <StepLabel stepName={step}/>
                            </div>
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FormProgress;
