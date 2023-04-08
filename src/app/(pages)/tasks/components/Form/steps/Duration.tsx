import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
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
    return (
        <div>
            <InputField
                fieldName={"duration"}
                registerFn={register}
                labelText={"Set duration (in minutes)"}
                type="number"
                min={1}
                max={24 * 60}
                inputError={durationError}
            />
        </div>
    );
};