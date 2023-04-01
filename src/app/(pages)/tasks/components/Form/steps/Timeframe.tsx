import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import FormStepContainer from "./FormStepContainer"

export const TimeframeStep = () => {
    const { types } = useAppSelector((state) => state.tasks.taskForm);
    const nextStep =
        types &&
        types.includes("REPEAT") &&
        TasksConfig.form.stepNames.repeatCount;

    const previousStep = types && types.includes("TIMER") && TasksConfig.form.stepNames.duration

    return (
        <FormStepContainer nextStep={nextStep || undefined} previousStep={previousStep || undefined}>
            Timeframe
        </FormStepContainer>
    )
}