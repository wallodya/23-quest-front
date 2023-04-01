"use client"

import { FormControl, FormField, FormLabel } from "@radix-ui/react-form";
import { useTaskFormControls } from "@task/hooks";
import TasksConfig from "@task/tasks.config";
import { CreateTaskBody, TaskStepProps } from "@task/types";
import InputField from "components/ui/InputField";
import { AnimatePresence } from "framer-motion";
import { LegacyRef, RefObject, useEffect, useRef } from "react";
import { UseFormGetValues } from "react-hook-form";
import FormStepContainer from "./FormStepContainer";

export const TitleAndTypeStep = ({
    registerFn,
    errors: { title: titleFieldError },
    onNext,
    onPrevious,
}: TaskStepProps) => {
    return (
        <FormStepContainer nextStep={TasksConfig.form.stepNames.description} onNext={onNext}>
                {/* <FormField name="title">
                    <FormLabel>Title</FormLabel>
                    <FormControl asChild>
                        <input {...registerFn("title")} />
                    </FormControl>
                </FormField> */}
                <InputField
                    fieldName="title"
                    registerFn={registerFn}
                    labelText={"Add title"}
                />
                <FormField name="isTimer">
                    <FormLabel>isTimer</FormLabel>
                    <FormControl asChild>
                        <input {...registerFn("isTimer")} type={"checkbox"} />
                    </FormControl>
                </FormField>
                <FormField name="isPeriodic">
                    <FormLabel>isPeriodic</FormLabel>
                    <FormControl asChild>
                        <input {...registerFn("isPeriodic")} type={"checkbox"} />
                    </FormControl>
                </FormField>
                <FormField name="isRepeat">
                    <FormLabel>isRepeat</FormLabel>
                    <FormControl asChild>
                        <input {...registerFn("isRepeat")} type={"checkbox"} />
                    </FormControl>
                </FormField>
        </FormStepContainer>
    );
};
