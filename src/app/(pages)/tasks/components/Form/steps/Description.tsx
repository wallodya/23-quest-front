import { StepProps, } from "@task/types";
import InputField from "components/ui/InputField";

export const DescriptionStep = ({
    formControls: {
        register,
        formState: {
            errors: { text: descriptionFieldError },
        }
    },
}: StepProps) => {
    return (
        <div>
            <InputField
                registerFn={register}
                fieldName="text"
                labelText="Add Description (optional)"
                inputError={descriptionFieldError}
            />
        </div>
    );
};