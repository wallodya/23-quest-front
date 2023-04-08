"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import { setTypes } from "@task/features";
import { useTaskFormControls } from "@task/hooks";
import { CreateTaskBody, Task, TaskOptimistic, TaskType } from "@task/types";
import FormWrapper from "components/ui/FormWrapper";
import Submit from "components/ui/Submit";
import { motion } from "framer-motion";
import { ReactNode, useCallback, useEffect, useMemo } from "react";
import { SubmitHandler, useForm, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { useAppDispatch } from "store";
import { createTaskSchema } from "./taskForm.schema";
import jwt_decode from "jwt-decode";
import { User } from "@user/types";
import { CurrentStep } from "./steps";

const $TEST_new_task: Task = {
    uuid: "1",
    uniqueTaskId: "some-task-id",
    text: "another some new task text for testing bla bla jwfbfoebiwf",
    title: "already added task",
    types: ["PERIODIC", "TIMER", "REPEAT"],
    isCompleted: false,
    isFailed: false,
    startTime: new Date("2023-03-24"),
    endTime: new Date("2023-03-25"),
    duration: 30 * 60 * 1000,
    repeatCount: 3,
    priority: "MEDIUM",
    isInQuest: false,
    questId: null,
    isCurrentInQuest: false,
    createdAt: String(new Date("20-03-2023")),
    updatedAt: String(new Date("20-03-2023")),
};

export const NewTaskForm = ({ children }: { children: ReactNode }) => {
    const formControls = useForm<CreateTaskBody>({ resolver: zodResolver(createTaskSchema), mode: "onChange"});
    // const {
    //     register,
    //     handleSubmit,
    //     watch,
        
    //     formState: { errors: formErrors, isDirty, isValid, isValidating },
    // } = useForm<CreateTaskBody>({ resolver: zodResolver(createTaskSchema), mode: "onBlur"});
    const { saveTaskTypes, saveTask } = useTaskFormControls(formControls.watch);
    const registerFn: UseFormRegister<CreateTaskBody> = useCallback(
      (fieldName) => {
        return formControls.register(fieldName)
      },
      [],
    )
    
    // const Step = useCurrentFormStep({
    //     registerFn,
    //     errors: formControls.formState.errors,
    //     onNext: saveTaskTypes,
    // });
    const onSubmit: SubmitHandler<CreateTaskBody> = (data) => {
        const types: TaskType = []
        data.isPeriodic && types.push("PERIODIC")
        data.isTimer && types.push("TIMER")
        data.isRepeat && types.push("REPEAT")
        types.length === 0 && types.push("BASIC")

        const userToken = localStorage.getItem("JWT_TOKEN") // TODO encapsulate and use const from config
        const uuid = userToken ?  jwt_decode<{sub: User, iat: number, exp: number}>(userToken).sub.uuid : "token-not-exists" // TODO encapsulate

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
            updatedAt: String(new Date())
        }; // TODO encapsulate

        delete reqData.isRepeat
        delete reqData.isTimer
        delete reqData.isPeriodic

        saveTask(reqData)
    }
    return (
        <FormWrapper
            className="flex h-[45vh] flex-col justify-between gap-2 px-4 py-3"
            onSubmit={formControls.handleSubmit(onSubmit)}
        >
            <CurrentStep formControls={formControls} callbacks={{ title: { onNext: saveTaskTypes } }}/>

            {/* <div>isValid: {String(formControls.formState.isValid)} */}
                {/* {Object.values(formErrors).map((err, index) => <span key={index}>{err.message}</span>)}
                {Object.keys(formErrors).map((err, index) => <span key={index}>{err}</span>)} */}
            {/* </div> */}

            <Submit disabled={!formControls.formState.isValid}>Save</Submit>
        </FormWrapper>
    );
};
