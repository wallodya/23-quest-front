import TasksConfig from "@task/tasks.config"
import FormStepContainer from "./FormStepContainer";
import FormStepControls from "./FormStepContainer"
import InputField from "components/ui/InputField";
import { StepProps, } from "@task/types";

export const DescriptionStep = ({
    formControls: {
        register,
        formState: {
            errors: { text: descriptionFieldError },
        }
    },
}: StepProps) => {
    return (
        <FormStepContainer
            nextStep={TasksConfig.form.stepNames.priority}
            previousStep={TasksConfig.form.stepNames.title}
        >
            <InputField
                registerFn={register}
                fieldName="text"
                labelText="Add Description (optional)"
                inputError={descriptionFieldError}
            />
        </FormStepContainer>
    );
};