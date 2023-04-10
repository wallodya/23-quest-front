import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import { StepProps } from "@task/types";
import InputField from "components/ui/InputField";
import { FormField, FormControl, FormLabel } from "@radix-ui/react-form";

export const DurationStep = ({
    formControls: {
        register,
        formState: { errors: {
            duration: durationError
        }},
    },
}: StepProps) => {
    return (
        <div>
            <InputField
                fieldName={"duration"}
                registerFn={register}
                labelText={"Set duration (in minutes)"}
                type="number"
                min={1}
                max={24 * 60}
                inputError={durationError}
            />
            <div className="flex justify-between">
                <FormField
                    name="durationHours"
                    className="flex w-fit  overflow-hidden border text-slate-800 focus:border-sky-500 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-gray-400 dark:focus:border-sky-400 dark:focus:ring-sky-400"
                >
                    <FormControl asChild className="">
                        <input
                            // {...register("priority")}
                            type="number"
                            value={"NOT_IMPORTANT"}
                            id="not_important"
                            className=" w-14 bg-transparent"
                        />
                    </FormControl>
                    <div className="rounded-r-lg w-14 flex items-center justify-center bg-slate-600 p-2.5 text-sm text-slate-400">
                        hours
                    </div>
                </FormField>
                <FormField
                    name="durationMinutes"
                    className="flex w-fit rounded-lg overflow-hidden border text-slate-800 focus:border-sky-500 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-gray-400 dark:focus:border-sky-400 dark:focus:ring-sky-400"
                >
                    <FormControl asChild className="">
                        <input
                            // {...register("priority")}
                            type="number"
                            value={"NOT_IMPORTANT"}
                            id="not_important"
                            className="w-14 bg-transparent"
                        />
                    </FormControl>
                    <div className="w-14 flex items-center justify-center bg-slate-600 p-2.5 text-sm text-slate-400">
                        min
                    </div>
                </FormField>
                <FormField
                    name="durationSeconds"
                    className="flex w-fit rounded-lg overflow-hidden border text-slate-800 focus:border-sky-500 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-gray-400 dark:focus:border-sky-400 dark:focus:ring-sky-400"
                >
                    <FormControl asChild className="">
                        <input
                            // {...register("priority")}
                            type="number"
                            value={"NOT_IMPORTANT"}
                            id="not_important"
                            className="w-14 bg-transparent"
                        />
                    </FormControl>
                    <div className="w-14 flex items-center justify-center bg-slate-600 p-2.5 text-sm text-slate-400">
                        sec
                    </div>
                </FormField>
            </div>
        </div>
    );
};