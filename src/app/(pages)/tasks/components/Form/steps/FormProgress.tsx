import TasksConfig from "@task/tasks.config";
import React from "react";
import { useAppSelector } from "store";

const FormProgress = () => {
    const { currentStep } = useAppSelector((state) => state.tasks.taskForm);
    return (
        <div className="font-bold text-sky-500">
            {TasksConfig.form.steps.get(currentStep)?.name}
        </div>
    );
};

export default FormProgress;
