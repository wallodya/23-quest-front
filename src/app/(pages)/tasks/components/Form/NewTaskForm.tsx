"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskFormControls } from "@task/hooks";
import { CreateTaskBody, TaskOptimistic, TaskType } from "@task/types";
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

export const NewTaskForm = ({ children }: { children: ReactNode }) => {
    const formControls = useForm<CreateTaskBody>({
        resolver: zodResolver(createTaskSchema),
        mode: "onChange",
    });
    const { saveTaskTypes, saveTask } = useTaskFormControls(formControls.watch);
    const onSubmit: SubmitHandler<CreateTaskBody> = (data) => {
        const types: TaskType = [];
        data.isPeriodic && types.push("PERIODIC");
        data.isTimer && types.push("TIMER");
        data.isRepeat && types.push("REPEAT");
        types.length === 0 && types.push("BASIC");

        const userToken = localStorage.getItem("JWT_TOKEN"); // TODO encapsulate and use const from config
        const uuid = userToken
            ? jwt_decode<{ sub: User; iat: number; exp: number }>(userToken).sub
                  .uuid
            : "token-not-exists"; // TODO encapsulate

        const reqData: TaskOptimistic &
            Partial<{
                isTimer: boolean;
                isRepeat: boolean;
                isPeriodic: boolean;
            }> = {
            uuid,
            title: data.title,
            text: data.text,
            priority: data.priority,

            duration: data.duration || null,
            startTime: data.startTime || null,
            endTime: data.endTime || null,
            repeatCount: data.repeatCount || null,

            types,
            isCompleted: false,
            isFailed: false,

            isCurrentInQuest: false,
            isInQuest: false,
            questId: null,
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
            <TaskFormContainer
                callbacks={{ "title&type": { onNext: saveTaskTypes } }}
            >
                <FormProgress formControls={formControls}/>
                <div className="mt-6 h-full flex flex-col justify-center">
                    <CurrentStep formControls={formControls} />
                </div>
            </TaskFormContainer>

            {/* <div>isValid: {String(formControls.formState.isValid)} */}
            {/* {Object.values(formErrors).map((err, index) => <span key={index}>{err.message}</span>)}
                {Object.keys(formErrors).map((err, index) => <span key={index}>{err}</span>)} */}
            {/* </div> */}

            <Submit disabled={!formControls.formState.isValid}>Save</Submit>
        </FormWrapper>
    );
};
