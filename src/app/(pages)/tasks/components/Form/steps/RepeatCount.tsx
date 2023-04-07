import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store"
import FormStepContainer from "./FormStepContainer";
import { StepProps} from "@task/types";
import InputField from "components/ui/InputField";

export const RepeatCountStep = ({
    formControls: {
        register,
        formState: { errors: {
            repeatCount: repeatCountError
        }},
    },
}: StepProps) => {
    const { types } = useAppSelector((state) => state.tasks.taskForm);
    const previousStep =
        types &&
        ((types.includes("PERIODIC") && TasksConfig.form.stepNames.timeframe) ||
            (types.includes("TIMER") && TasksConfig.form.stepNames.duration)) || TasksConfig.form.stepNames.priority;
    return (
        <FormStepContainer previousStep={previousStep || undefined}>
            <InputField
                fieldName={"repeatCount"}
                registerFn={register}
                labelText={"Set number of repeats"}
                type="number"
                min={1}
                max={200}
                inputError={repeatCountError}
            />
        </FormStepContainer>
    )
}
