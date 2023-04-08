import TasksConfig from "@task/tasks.config";
import { useAppSelector } from "store";
import InputField from "components/ui/InputField";
import { StepProps } from "@task/types";

export const TimeframeStep = ({
    formControls: {
        register,
        formState: { errors: {
            startTime: startTimeError,
            endTime: endTimeError,
        }},
    },
}: StepProps) => {
    return (
        <div className="h-full flex flex-col gap-4 ">
            
            <InputField
                fieldName={"startTime"}
                registerFn={register}
                labelText={"Set start time:"}
                type="datetime-local"
                inputError={startTimeError}
                isInline={true}
                // min={1}
                // max={200}
            />
            <InputField
                fieldName={"endTime"}
                registerFn={register}
                labelText={"Set end time:"}
                type="datetime-local"
                inputError={endTimeError}
                isInline={true}
                // min={1}
                // max={200}
            />
        </div>
    )
}