import TasksConfig from "@task/tasks.config";
import { TaskStepProps } from "@task/types";
import InputField from "components/ui/InputField";
import FormStepControls from "./FormStepControls";

export const TitleAndTypeStep = ({
    registerFn,
    errors: { title: titleFieldError },
}: TaskStepProps) => {
    return (
        <>
            <InputField
                labelText={"Name of the task"}
                fieldName={"title"}
                registerFn={registerFn}
                inputError={titleFieldError}
            />
            <InputField
                labelText="Add types"
                fieldName="type"
                type={"radio"}
                registerFn={registerFn}
            />
            <FormStepControls nextStep={TasksConfig.form.stepNames.description}/>
        </>
    );
};