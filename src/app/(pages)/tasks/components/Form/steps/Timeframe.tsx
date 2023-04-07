import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import FormStepContainer from "./FormStepContainer"
import InputField from "components/ui/InputField";
import { StepProps } from "@task/types";

export const TimeframeStep = ({
    formControls: {
        register,
        formState: { errors: {
            startTime: startTimeError,
            endTime: endTimeError,
        }},
    },
}: StepProps) => {
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
                registerFn={register}
                labelText={"Set start time:"}
                type="datetime-local"
                inputError={startTimeError}
                // min={1}
                // max={200}
            />
            <InputField
                fieldName={"endTime"}
                registerFn={register}
                labelText={"Set end time:"}
                type="datetime-local"
                inputError={endTimeError}
                // min={1}
                // max={200}
            />
        </FormStepContainer>
    )
}