import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import { StepProps } from "@task/types";
import InputField from "components/ui/InputField";
import { FormField, FormControl, FormLabel } from "@radix-ui/react-form";
import { useEffect, useState } from "react";
import { FieldError } from "react-hook-form";
import { ScrollLoop } from "components/ui/ScrollLoop";

export const DurationStep = ({
    formControls: {
        register,
        formState: { errors: {
            durationSeconds: secondsError,
            durationMinutes: minutesError,
            durationHours: hoursError
        }},
    },
}: StepProps) => {
    const [shownError, setShownError] = useState<FieldError | undefined>(
        [hoursError, minutesError, secondsError].find((err) => err !== undefined),
    );
    useEffect(() => {
        [hoursError, minutesError, secondsError].every(err => err === undefined) && setShownError(undefined)
        hoursError && setShownError(hoursError)
        minutesError && setShownError(minutesError)
        secondsError && setShownError(secondsError)
    }, [hoursError, minutesError, secondsError])
    return (
        <div className="">
            <div className="flex justify-between">
                <FormField
                    name="durationHours"
                    className="flex w-fit  overflow-hidden border text-slate-800 focus:border-sky-500 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-gray-400 dark:focus:border-sky-400 dark:focus:ring-sky-400"
                >
                    <FormControl asChild className="">
                        <input
                            {...register("durationHours")}
                            min={0}
                            max={24}
                            className=" w-14 bg-transparent p-1 text-sm"
                            type="number"
                        />
                    </FormControl>
                    <div className="flex w-14 items-center justify-center rounded-r-lg bg-slate-600 p-2.5 text-sm text-slate-400">
                        hours
                    </div>
                </FormField>
                <FormField
                    name="durationMinutes"
                    className="flex w-fit overflow-hidden rounded-lg border text-slate-800 focus:border-sky-500 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-gray-400 dark:focus:border-sky-400 dark:focus:ring-sky-400"
                >
                    <FormControl asChild className="">
                        <input
                            {...register("durationMinutes")}
                            min={0}
                            max={59}
                            className="w-14 bg-transparent p-1 text-sm"
                            type="number"
                        />
                    </FormControl>
                    <div className="flex w-14 items-center justify-center bg-slate-600 p-2.5 text-sm text-slate-400">
                        min
                    </div>
                </FormField>
                <FormField
                    name="durationSeconds"
                    className="flex w-fit overflow-hidden rounded-lg border text-slate-800 focus:border-sky-500 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-gray-400 dark:focus:border-sky-400 dark:focus:ring-sky-400"
                >
                    <FormControl asChild className="">
                        <input
                            {...register("durationSeconds")}
                            // type="number"
                            // value={"NOT_IMPORTANT"}
                            // id="not_important"
                            min={0}
                            max={59}
                            className="w-14 bg-transparent p-1 text-sm"
                            type="number"
                        />
                    </FormControl>
                    <div className="flex w-14 items-center justify-center bg-slate-600 p-2.5 text-sm text-slate-400">
                        sec
                    </div>
                </FormField>
            </div>
            <div
                className={
                    "mt-4 text-xs font-medium text-red-600 dark:text-red-400"
                }
            >
                {shownError && <span>{shownError.message}</span>}
            </div>
            {/* <div className="h-[10rem] text-slate-700">
                <ScrollLoop
                    steps={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
                        value: num,
                        Component: () => <p className="text-slate-100 px-2 py-1 font-bold text-lg">{num}</p>,
                    }))}
                    scrollAxis="y"
                />
            </div> */}
        </div>
    );
};