"use client"

import { FormControl, FormField, FormLabel } from "@radix-ui/react-form";
import { useTaskFormControls } from "@task/hooks";
import TasksConfig from "@task/tasks.config";
import { CreateTaskBody, StepProps, } from "@task/types";
import InputField from "components/ui/InputField";
import { AnimatePresence } from "framer-motion";
import { LegacyRef, RefObject, useEffect, useRef } from "react";
import { UseFormGetValues } from "react-hook-form";
import FormStepContainer from "./FormStepContainer";

export const TitleAndTypeStep = ({
    formControls: {
        register,
        formState: {
            errors: { title: titleFieldError },
        },
    },
    onNext,
    onPrevious,
}: StepProps) => {
    return (
        <FormStepContainer
            nextStep={TasksConfig.form.stepNames.description}
            onNext={onNext}
        >
            {/* <FormField name="title">
                    <FormLabel>Title</FormLabel>
                    <FormControl asChild>
                        <input {...registerFn("title")} />
                    </FormControl>
                </FormField> */}
            <InputField
                fieldName="title"
                registerFn={register}
                labelText={"Add title"}
                inputError={titleFieldError}
            />
            <FormField name="isTimer">
                <FormLabel>isTimer</FormLabel>
                <FormControl asChild>
                    <input {...register("isTimer")} type={"checkbox"} />
                </FormControl>
            </FormField>
            <FormField name="isPeriodic">
                <FormLabel>isPeriodic</FormLabel>
                <FormControl asChild>
                    <input {...register("isPeriodic")} type={"checkbox"} />
                </FormControl>
            </FormField>
            <FormField name="isRepeat">
                <FormLabel>isRepeat</FormLabel>
                <FormControl asChild>
                    <input {...register("isRepeat")} type={"checkbox"} />
                </FormControl>
            </FormField>
        </FormStepContainer>
    );
};
