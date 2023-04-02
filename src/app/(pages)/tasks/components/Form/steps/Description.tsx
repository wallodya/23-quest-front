import TasksConfig from "@task/tasks.config"
import FormStepContainer from "./FormStepContainer";
import FormStepControls from "./FormStepContainer"
import InputField from "components/ui/InputField";
import { TaskStepProps } from "@task/types";

export const DescriptionStep = ({registerFn, errors: { text: DescriptionFieldError }}: TaskStepProps) => {
    return (
        <FormStepContainer
            nextStep={TasksConfig.form.stepNames.priority}
            previousStep={TasksConfig.form.stepNames.title}
        >
            <InputField
                registerFn={registerFn}
                fieldName="description"
                labelText="Add Description (optional)"
            />
        </FormStepContainer>
    );
}