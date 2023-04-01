import TasksConfig from "@task/tasks.config"
import { useAppSelector } from "store"
import FormStepContainer from "./FormStepContainer"

export const PriorityStep = () => {
    const { types } = useAppSelector((state) => state.tasks.taskForm);
    const nextStep =
        types &&
        ((types.includes("TIMER") && TasksConfig.form.stepNames.duration) ||
            (types.includes("PERIODIC") &&
                TasksConfig.form.stepNames.timeframe) ||
            (types.includes("REPEAT") &&
                TasksConfig.form.stepNames.repeatCount));
    return (
        <FormStepContainer nextStep={nextStep || undefined} previousStep={TasksConfig.form.stepNames.description}>
            Priority
        </FormStepContainer>
    )
}