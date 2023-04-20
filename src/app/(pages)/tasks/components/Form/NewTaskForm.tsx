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
                (data.durationHours || data.durationMinutes || data.durationSeconds) ?
                Number(data.durationSeconds) * 1000  +
                    Number(data.durationMinutes)  * 1000 * 60 +
                    Number(data.durationHours) * 1000  * 60 * 60 : null,
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
            className="flex h-[60vh] w-[min(100vw,30rem)] flex-col justify-between gap-2 px-4 py-3"
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
