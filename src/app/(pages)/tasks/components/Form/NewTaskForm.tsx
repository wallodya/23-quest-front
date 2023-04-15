"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskFormControls } from "@task/hooks";
import { TaskFormFields, TaskOptimistic, TaskType } from "@task/types";
import { User } from "@user/types";
import FormWrapper from "components/ui/FormWrapper";
import Submit from "components/ui/Submit";
import jwt_decode from "jwt-decode";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TaskFormContainer from "./TaskFormContainer";
import { CurrentStep } from "./steps";
import FormProgress from "./steps/FormProgress";
import { createTaskSchema } from "./taskForm.schema";

export const NewTaskForm = ({
    // children,
    submitTaskFn: saveTask,
}: {
    // children: ReactNode;
    submitTaskFn: (payload: TaskOptimistic) => void;
}) => {
    const formControls = useForm<TaskFormFields>({
        resolver: zodResolver(createTaskSchema),
        mode: "onChange",
        reValidateMode: "onBlur",
    });
    const onSubmit: SubmitHandler<TaskFormFields> = (data) => {
        const types: TaskType = [];
        data.isPeriodic && types.push("PERIODIC");
        data.isTimer && types.push("TIMER");
        data.isRepeat && types.push("REPEAT");
        types.length === 0 && types.push("BASIC");

        const reqData: TaskOptimistic &
            Partial<{
                isTimer: boolean;
                isRepeat: boolean;
                isPeriodic: boolean;
            }> = {
            // uuid,
            title: data.title,
            text: data.text,
            priority: data.priority,

            duration:
                (data.durationHours && data.durationMinutes && data.durationSeconds) ?
                data.durationSeconds * 1000  +
                    data.durationMinutes  * 1000 * 60 +
                    data.durationHours * 1000  * 60 * 60 : null,
            startTime: data.startTime || null,
            endTime: data.endTime || null,
            repeatCount: data.repeatCount || null,

            types,
            isCompleted: false,
            isFailed: false,

            isCurrentInQuest: false,
            isInQuest: false,
            // questId: null,
            uniqueQuestId: null,
            createdAt: String(new Date()),
            updatedAt: String(new Date()),
        }; // TODO encapsulate

        delete reqData.isRepeat;
        delete reqData.isTimer;
        delete reqData.isPeriodic;

        saveTask(reqData);
    };
    return (
        <FormWrapper
            className="flex h-[50vh] flex-col justify-between gap-2 px-4 py-3"
            onSubmit={formControls.handleSubmit(onSubmit)}
        >
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
        </FormWrapper>
    );
};
