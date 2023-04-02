import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import FormStepContainer from "./FormStepContainer"
import { TaskStepProps } from "@task/types";
import InputField from "components/ui/InputField";

export const DurationStep = ({registerFn, errors}: TaskStepProps) => {
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
                registerFn={registerFn}
                labelText={"Set duration (in minutes)"}
                type="number"
                min={1}
                max={24 * 60}
            />
        </FormStepContainer>
    );
}