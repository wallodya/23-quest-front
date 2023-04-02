import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import FormStepContainer from "./FormStepContainer"
import { TaskStepProps } from "@task/types";
import InputField from "components/ui/InputField";

export const TimeframeStep = ({registerFn, errors}: TaskStepProps) => {
    const { types } = useAppSelector((state) => state.tasks.taskForm);
    const nextStep =
        types &&
        types.includes("REPEAT") &&
        TasksConfig.form.stepNames.repeatCount;

    const previousStep =
        (types &&
            types.includes("TIMER") &&
            TasksConfig.form.stepNames.duration) ||
        TasksConfig.form.stepNames.priority;

    return (
        <FormStepContainer nextStep={nextStep || undefined} previousStep={previousStep || undefined}>
            
            <InputField
                fieldName={"startTime"}
                registerFn={registerFn}
                labelText={"Set start time:"}
                type="datetime-local"
                // min={1}
                // max={200}
            />
            <InputField
                fieldName={"endTime"}
                registerFn={registerFn}
                labelText={"Set end time:"}
                type="datetime-local"
                // min={1}
                // max={200}
            />
        </FormStepContainer>
    )
}