"use client";

import { FormControl, FormField, FormLabel } from "@radix-ui/react-form";
import { setTypes } from "@task/features";
import { useTaskFormControls } from "@task/hooks";
import TasksConfig from "@task/tasks.config";
import { StepProps, TaskType } from "@task/types";
import PeriodIcon from "components/icons/PeriodIcon";
import RepeatIcon from "components/icons/RepeatIcon";
import TimerIcon from "components/icons/TimerIcon";
import InputField from "components/ui/InputField";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store";

export const TitleAndTypeStep = ({
    formControls: {
        register,
        watch,
        getValues,
        resetField,
        formState: {
            errors: { title: titleFieldError },
        },
    },
}: StepProps) => {
    const [isTimer, setIsTimer] = useState(getValues().isTimer);
    const [isPeriodic, setIsPeriodic] = useState(getValues().isPeriodic);
    const [isRepeat, setIsRepeat] = useState(getValues().isRepeat);

    const { types } = useAppSelector(state => state.tasks.taskForm)
    const dispatch = useAppDispatch()

    const setTaskTypes = (payload: TaskType) => {
        dispatch(setTypes(payload))
    }
    useEffect(() => {
        const { unsubscribe } = watch((values) => {
            setIsTimer(values.isTimer ?? false);
            setIsPeriodic(values.isPeriodic ?? false);
            setIsRepeat(values.isRepeat ?? false);
            
            let taskTypes = types

            
            if (values.isRepeat) {
                !taskTypes.includes("REPEAT") && (taskTypes = [...taskTypes, "REPEAT"]);
            } else {
                taskTypes = taskTypes.filter((type) => type !== "REPEAT")
                getValues().repeatCount && resetField("repeatCount")
            }

            if (values.isPeriodic) {
                !taskTypes.includes("PERIODIC") && (taskTypes = [...taskTypes, "PERIODIC"]);
            } else {
                taskTypes = taskTypes.filter((type) => type !== "PERIODIC")
                getValues().startTime && resetField("startTime")
                getValues().endTime && resetField("endTime")
            }
            
            if (values.isTimer) {
                !taskTypes.includes("TIMER") && (taskTypes = [...taskTypes, "TIMER"]);
            } else {
                taskTypes = taskTypes.filter((type) => type !== "TIMER")
                getValues().durationSeconds && resetField("durationSeconds")
                getValues().durationMinutes && resetField("durationMinutes")
                getValues().durationHours && resetField("durationHours")
            }
            
            if (taskTypes.length === 0) {
                taskTypes.push("BASIC");
            }
            
            if (taskTypes.length > 1 && taskTypes.includes("BASIC")) {
                taskTypes = taskTypes.filter((type) => type !== "BASIC")
            }

            setTaskTypes(taskTypes)
            
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div>
            <InputField
                fieldName="title"
                registerFn={register}
                labelText={"Add title"}
                inputError={titleFieldError}
            />
            <div className="mt-6 text-sm font-medium text-slate-100">Set task types</div>
            <div className="mt-2 flex gap-2">
                <FormField name="isTimer">
                    <FormLabel
                        className={`flex items-center justify-between gap-2 px-2 py-1 ${
                            isTimer ? "text-fuchsia-600" : "text-slate-400"
                        } rounded-full border-2 text-sm ${
                            isTimer ? "border-fuchsia-600" : "border-slate-400"
                        }`}
                    >
                        <TimerIcon size="xs" />
                        Timer
                    </FormLabel>
                    <FormControl asChild>
                        <input
                            {...register("isTimer")}
                            type={"checkbox"}
                            className="hidden"
                        />
                    </FormControl>
                </FormField>
                <FormField name="isPeriodic">
                    <FormLabel
                        className={`flex items-center justify-between gap-2 px-2 py-1 ${
                            isPeriodic ? "text-sky-600" : "text-slate-400"
                        } rounded-full border-2 text-sm ${
                            isPeriodic ? "border-sky-600" : "border-slate-400"
                        }`}
                    >
                        <PeriodIcon size="xs" />
                        Periodic
                    </FormLabel>
                    <FormControl asChild>
                        <input
                            {...register("isPeriodic")}
                            type={"checkbox"}
                            className="hidden"
                        />
                    </FormControl>
                </FormField>
                <FormField name="isRepeat">
                    <FormLabel
                        className={`flex items-center justify-between gap-2 px-2 py-1 ${
                            isRepeat ? "text-violet-500" : "text-slate-400"
                        } rounded-full border-2 text-sm ${
                            isRepeat ? "border-violet-500" : "border-slate-400"
                        }`}
                    >
                        <RepeatIcon size="xs" />
                        Repeat
                    </FormLabel>
                    <FormControl asChild>
                        <input
                            {...register("isRepeat")}
                            type={"checkbox"}
                            className="hidden"
                        />
                    </FormControl>
                </FormField>
            </div>
        </div>
    );
};
