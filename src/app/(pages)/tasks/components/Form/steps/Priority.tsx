import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import FormStepContainer from "./FormStepContainer";
import { StepProps } from "@task/types";
import {
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@radix-ui/react-form";

export const PriorityStep = ({
    formControls: {
        register,
        formState: { errors: {
            priority: priorityError 
        }},
    },
}: StepProps) => {
    const { types } = useAppSelector((state) => state.tasks.taskForm);
    const nextStep =
        types &&
        ((types.includes("TIMER") && TasksConfig.form.stepNames.duration) ||
            (types.includes("PERIODIC") &&
                TasksConfig.form.stepNames.timeframe) ||
            (types.includes("REPEAT") &&
                TasksConfig.form.stepNames.repeatCount));
    return (
        <FormStepContainer
            nextStep={nextStep || undefined}
            previousStep={TasksConfig.form.stepNames.description}
        >
            <div>
                {/* <fieldset
                    {...registerFn("priority")}
                    className="flex flex-col gap-2"
                > */}
                    {/* <FormLabel>How important this taks is?</FormLabel> */}
                    <FormField name="priotity">
                        <FormControl asChild>
                            <input
                                // name="priority"
                                {...register("priority")}
                                type="radio"
                                value={"MEDIUM"}
                                id="medium"
                            />
                        </FormControl>
                        <FormLabel htmlFor="medium">Medium</FormLabel>
                    </FormField>
                    <FormField name="priority">
                        <FormControl asChild>
                            <input
                                // name="priority"
                                {...register("priority")}
                                type="radio"
                                value={"URGENT"}
                                id="urgent"
                            />
                        </FormControl>
                        <FormLabel htmlFor="urgent">Urgent</FormLabel>
                    </FormField>
                    <FormField name="priority">
                        <FormControl asChild>
                            <input
                                // name="priority"
                                {...register("priority")}
                                type="radio"
                                value={"NOT_IMPORTANT"}
                                id="not_important"
                            />
                        </FormControl>
                        <FormLabel htmlFor="not_important">
                            Not important
                        </FormLabel>
                    </FormField>
                {/* </fieldset> */}
            </div>
        </FormStepContainer>
    );
};
