import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import FormStepContainer from "./FormStepContainer"

export const DurationStep = () => {
    const { types } = useAppSelector((state) => state.tasks.taskForm);
    const nextStep =
        types &&
        ((types.includes("PERIODIC") && TasksConfig.form.stepNames.timeframe) ||
            (types.includes("REPEAT") &&
                TasksConfig.form.stepNames.repeatCount));

    return (
        <FormStepContainer nextStep={nextStep || undefined} previousStep={TasksConfig.form.stepNames.priority}>
            Duration
        </FormStepContainer>
    )
}