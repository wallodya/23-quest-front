import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import FormStepContainer from "./FormStepContainer"
import { StepProps } from "@task/types";
import InputField from "components/ui/InputField";

export const DurationStep = ({
    formControls: {
        register,
        formState: { errors: {
            duration: durationError
        }},
    },
}: StepProps) => {
    const { types } = useAppSelector((state) => state.tasks.taskForm);
    const nextStep =
        types &&
        ((types.includes("PERIODIC") && TasksConfig.form.stepNames.timeframe) ||
            (types.includes("REPEAT") &&
                TasksConfig.form.stepNames.repeatCount));

    return (
        <FormStepContainer
            nextStep={nextStep || undefined}
            previousStep={TasksConfig.form.stepNames.priority}
        >
            <InputField
                fieldName={"duration"}
                registerFn={register}
                labelText={"Set duration (in minutes)"}
                type="number"
                min={1}
                max={24 * 60}
                inputError={durationError}
            />
        </FormStepContainer>
    );
};