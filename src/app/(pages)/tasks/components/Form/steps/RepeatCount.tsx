import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store"
import FormStepContainer from "./FormStepContainer";

export const RepeatCountStep = () => {
    const { types } = useAppSelector((state) => state.tasks.taskForm);
    const previousStep =
        types &&
        ((types.includes("PERIODIC") && TasksConfig.form.stepNames.timeframe) ||
            (types.includes("TIMER") && TasksConfig.form.stepNames.duration));
    return (
        <FormStepContainer previousStep={previousStep || undefined}>
            Repeat count
        </FormStepContainer>
    )
}
