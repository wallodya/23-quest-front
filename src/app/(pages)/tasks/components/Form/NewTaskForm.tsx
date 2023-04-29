"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "components/ui/FormWrapper";
import Submit from "components/ui/Submit";
import { SubmitHandler, useForm } from "react-hook-form";
import TaskFormContainer from "./TaskFormContainer";
import { CurrentStep } from "./steps";
import FormProgress from "./steps/FormProgress";
import { CreateTaskSchemaT, createTaskSchema } from "./createTask.schema";

export const NewTaskForm = ({
    submitTaskFn: saveTask,
}: {
    submitTaskFn: SubmitHandler<CreateTaskSchemaT>;
}) => {
    const formControls = useForm<CreateTaskSchemaT>({
        resolver: zodResolver(createTaskSchema),
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    return (
        <FormWrapper
            // className=" flex h-[60vh] w-full justify-center px-4 pt-3 mb-40 md:mb-0 md:pb-3"
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
                <Submit disabled={!formControls.formState.isValid}>Save</Submit>
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
            </div>
        </FormWrapper>
    );
};
