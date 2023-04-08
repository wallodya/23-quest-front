"use client";

import { FormControl, FormField, FormLabel } from "@radix-ui/react-form";
import TasksConfig from "@task/tasks.config";
import { StepProps } from "@task/types";
import PeriodIcon from "components/icons/PeriodIcon";
import RepeatIcon from "components/icons/RepeatIcon";
import TimerIcon from "components/icons/TimerIcon";
import InputField from "components/ui/InputField";
import { useEffect, useState } from "react";

export const TitleAndTypeStep = ({
    formControls: {
        register,
        watch,
        getValues,
        formState: {
            errors: { title: titleFieldError },
        },
    },
}: StepProps) => {
    const [isTimer, setIsTimer] = useState(getValues().isTimer);
    const [isPeriodic, setIsPeriodic] = useState(getValues().isPeriodic);
    const [isRepeat, setIsRepeat] = useState(getValues().isRepeat);

    useEffect(() => {
        const { unsubscribe } = watch((values) => {
            setIsTimer(values.isTimer ?? false);
            setIsPeriodic(values.isPeriodic ?? false);
            setIsRepeat(values.isRepeat ?? false);
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
