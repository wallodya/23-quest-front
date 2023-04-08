import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store"
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
    return (
        <div className="">
            <InputField
                fieldName={"repeatCount"}
                registerFn={register}
                labelText={"Set number of repeats"}
                type="number"
                min={1}
                max={200}
                inputError={repeatCountError}
            />
        </div>
    )
}
