"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TaskFormFields, TaskOptimistic, TaskType } from "@task/types";
import FormWrapper from "components/ui/FormWrapper";
import Submit from "components/ui/Submit";
import { SubmitHandler, useForm } from "react-hook-form";
import TaskFormContainer from "./TaskFormContainer";
import { CurrentStep } from "./steps";
import FormProgress from "./steps/FormProgress";
import { createTaskSchema } from "./taskForm.schema";

export const NewTaskForm = ({
    submitTaskFn: saveTask,
}: {
    submitTaskFn: SubmitHandler<TaskFormFields>;
}) => {
    const formControls = useForm<TaskFormFields>({
        resolver: zodResolver(createTaskSchema),
        mode: "onChange",
        // reValidateMode: "onChange",
    });

    return (
        <FormWrapper
            className=" flex h-[60vh] w-full justify-center px-4 py-3"
            onSubmit={formControls.handleSubmit(saveTask)}
        >
            <div className="flex h-full w-[min(100vw,30rem)] flex-col items-center justify-between gap-2">
                <TaskFormContainer>
                    <FormProgress formControls={formControls} />
                    <div className="mt-6 flex h-full flex-col justify-center">
                        <CurrentStep formControls={formControls} />
                    </div>
                </TaskFormContainer>
                {/* 
            <div>
                isValid: {String(formControls.formState.isValid)}
                {Object.values(formControls.formState.errors).map(
                    (err, index) => (
                        <span key={index}>{err.message}</span>
                    ),
                )}
                {Object.keys(formControls.formState.errors).map(
                    (err, index) => (
                        <span key={index}>{err}</span>
                    ),
                )}
            </div> */}

                <Submit disabled={!formControls.formState.isValid}>Save</Submit>
            </div>
        </FormWrapper>
    );
};
