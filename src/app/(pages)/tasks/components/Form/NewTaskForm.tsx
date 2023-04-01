import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormLabel, FormMessage, FormSubmit } from "@radix-ui/react-form";
import { setTypes } from "@task/features";
import { useCurrentFormStep, useTaskFormControls } from "@task/hooks";
import { CreateTaskBody, Task, TaskType } from "@task/types";
import FormWrapper from "components/ui/FormWrapper";
import Submit from "components/ui/Submit";
import { motion } from "framer-motion";
import { ReactNode, useCallback, useEffect, useMemo } from "react";
import { SubmitHandler, useForm, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { useAppDispatch } from "store";
import { createTaskSchema } from "./taskForm.schema";

const $TEST_new_task: Task = {
    task_id: 1,
    userId: 1,
    uniqueTaskId: "some-task-id",
    text: "another some new task text for testing bla bla jwfbfoebiwf",
    title: "already added task",
    types: ["PERIODIC", "TIMER", "REPEAT"],
    isCompleted: false,
    isFailed: false,
    startTime: Number(new Date("2023-03-24")),
    endTime: Number(new Date("2023-03-25")),
    duration: 30 * 60 * 1000,
    repeatTimes: 3,
    priority: "MEDIUM",
    difficulty: "EASY",
    isInQuest: false,
    questId: null,
    isCurrentInQuest: false,
    createdAt: new Date("20-03-2023").toDateString(),
    updatedAt: new Date("20-03-2023").toDateString(),
};

export const NewTaskForm = ({ children }: { children: ReactNode }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors: formErrors },
    } = useForm<CreateTaskBody>({ resolver: zodResolver(createTaskSchema) });
    const {typesInState, saveTaskTypes} = useTaskFormControls(watch)
    const registerFn: UseFormRegister<CreateTaskBody> = useCallback(
      (fieldName) => {
        return register(fieldName)
      },
      [],
    )
    
    const Step = useCurrentFormStep({
        registerFn,
        errors: formErrors,
        onNext: saveTaskTypes,
    });
    const onSubmit: SubmitHandler<CreateTaskBody> = (data) => {
        console.log('submit', data)
    }

    return (
        <FormWrapper
            className="flex min-h-[40vh] flex-col justify-between gap-2 px-4 py-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Step />
{/* 
            <FormSubmit asChild>
                <input type={"submit"} />
            </FormSubmit> */}
            <Submit>Save</Submit>
        </FormWrapper>
    );
};
