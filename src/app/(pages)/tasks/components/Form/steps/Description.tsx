import TasksConfig from "@task/tasks.config"
import FormStepContainer from "./FormStepContainer";
import FormStepControls from "./FormStepContainer"

export const DescriptionStep = () => {
    return (
        <FormStepContainer
            nextStep={TasksConfig.form.stepNames.priority}
            previousStep={TasksConfig.form.stepNames.title}
        >
            {/* <FormStepControls
                nextStep={TasksConfig.form.stepNames.priority}
                previousStep={TasksConfig.form.stepNames.tilte}
            > */}
            Description
        </FormStepContainer>
    );
}