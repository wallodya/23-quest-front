import TasksConfig from "@task/tasks.config"
import FormStepControls from "./FormStepControls"

export const DescriptionStep = () => {
    return (
        <div className="flex flex-col gap-4 font-bold text-red-400">
            Description
            <FormStepControls
                nextStep={TasksConfig.form.stepNames.priority}
                previousStep={TasksConfig.form.stepNames.tilte}
            />
        </div>
    );
}