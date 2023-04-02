import { setCurrentStep } from "@task/features";
import { useFormProgress } from "@task/hooks";
import TasksConfig from "@task/tasks.config";
import { TaskFormSteps, TaskStepProps } from "@task/types";
import React from "react";
import { useAppDispatch, useAppSelector } from "store";

const FormProgress = () => {
    const { currentStep } = useAppSelector((state) => state.tasks.taskForm);
    const dispatch = useAppDispatch()
    const {isProgressShown, currentStepCount, stepsTotal, allSteps} = useFormProgress()
    const handleSwitchStep = (to: TaskFormSteps) => {
        dispatch(setCurrentStep(to))
    }
    return (
        <div className="font-bold text-sky-500">
            {isProgressShown ? (
                <div>
                    {currentStepCount}/{stepsTotal}
                    {allSteps.map((step, index) => (
                        <span key={index} onClick={() => handleSwitchStep(step)}>
                            ||{step}||
                        </span>
                    ))}
                </div>
            ) : (
                <div>Create task</div>
            )}
            {TasksConfig.form.steps.get(currentStep)?.name}
        </div>
    );
};

export default FormProgress;
