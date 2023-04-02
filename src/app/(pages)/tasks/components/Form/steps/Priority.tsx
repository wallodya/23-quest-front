import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import FormStepContainer from "./FormStepContainer";
import { TaskStepProps } from "@task/types";

export const PriorityStep = ({ registerFn, errors }: TaskStepProps) => {
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
                <fieldset
                    {...registerFn("priority")}
                    className="flex flex-col gap-2"
                >
                    <div>
                        <input name="priority" type="radio" value={"URGENT"} id="urgent"/>
                        <label htmlFor="urgent">Urgent</label>
                    </div>
                    <div>
                        <input name="priority" type="radio" value={"MEDIUM"} id="medium"/>
                        <label htmlFor="medium">Medium</label>
                    </div>
                    <div>
                        <input
                            name="priority"
                            type="radio"
                            value={"NOT_IMPORTANT"}
                            id="not_important"
                        />
                        <label htmlFor="not_important">Not important</label>
                    </div>
                </fieldset>
            </div>
        </FormStepContainer>
    );
};
