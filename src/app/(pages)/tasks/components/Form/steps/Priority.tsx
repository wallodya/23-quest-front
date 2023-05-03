import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import { StepProps } from "@task/types";
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@radix-ui/react-form";
import { useState, useEffect } from "react";

export const PriorityStep = ({
    formControls: {
        register,
        getValues,
        watch,
        formState: { errors: {
            priority: priorityError 
        }},
    },
}: StepProps) => {
    const [priority, setPriority] = useState(getValues().priority);

    useEffect(() => {
        const { unsubscribe } = watch((values) => {
            setPriority(values.priority ?? "NOT_IMPORTANT")
        });
        return () => {
            unsubscribe();
        };
    }, []);
    return (
        <div>
            <div className="text-sm font-medium text-slate-100">
                Set task priority
            </div>
            {/* <div className={`relative mt-2 py-2 flex flex-row-reverse justify-between rounded-full`}> */}
            <div
                className={`relative mt-4 grid grid-cols-[5fr,3fr,3fr] justify-items-center py-2`}
            >
                <div className="pointer-events-none  absolute z-10 inset-0 grid h-full w-full grid-cols-[5fr,3fr,3fr] items-center">
                    <div
                        className={`col-start-1 h-full ${
                            priority === "MEDIUM"
                                ? "col-span-2 bg-sky-500/40"
                                : priority === "URGENT"
                                ? "col-span-3 bg-red-500/40"
                                : "col-span-1 bg-slate-400/40"
                        } rounded-full  transition-all`}
                    ></div>
                </div>
                <FormField name="priority">
                    <FormControl asChild>
                        <input
                            // name="priority"
                            {...register("priority")}
                            type="radio"
                            defaultChecked
                            value={"NOT_IMPORTANT"}
                            id="not_important"
                            className="hidden"
                        />
                    </FormControl>
                    <FormLabel
                        htmlFor="not_important"
                        className="text-sm font-bold text-slate-100"
                    >
                        Not important
                    </FormLabel>
                </FormField>
                <FormField name="priotity">
                    <FormControl asChild>
                        <input
                            // name="priority"
                            {...register("priority")}
                            type="radio"
                            value={"MEDIUM"}
                            id="medium"
                            className="hidden"
                        />
                    </FormControl>
                    <FormLabel
                        htmlFor="medium"
                        className={`text-sm font-bold ${
                            priority === "MEDIUM"
                                ? "text-sky-300"
                                : "text-slate-100"
                        }`}
                    >
                        Medium
                    </FormLabel>
                </FormField>
                <FormField name="priority">
                    <FormControl asChild>
                        <input
                            // name="priority"
                            {...register("priority")}
                            type="radio"
                            value={"URGENT"}
                            id="urgent"
                            className="hidden"
                        />
                    </FormControl>
                    <FormLabel
                        htmlFor="urgent"
                        className={`text-sm font-bold ${
                            priority === "URGENT"
                                ? "text-red-300"
                                : "text-slate-100"
                        }`}
                    >
                        Urgent
                    </FormLabel>
                </FormField>
            </div>
        </div>
    );
};
