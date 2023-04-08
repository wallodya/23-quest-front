import { TaskFormStepsProps } from "@task/types";
import { useAppSelector } from "store";
import { DescriptionStep } from "./Description";
import { DurationStep } from "./Duration";
import { PriorityStep } from "./Priority";
import { RepeatCountStep } from "./RepeatCount";
import { TimeframeStep } from "./Timeframe";
import { TitleAndTypeStep } from "./TitleAndType";

export const CurrentStep = ({
    formControls,
    callbacks,
}: TaskFormStepsProps) => {
    const { currentStep } = useAppSelector((state) => state.tasks.taskForm);
    switch (currentStep) {
        case "title&type": {
            return <TitleAndTypeStep formControls={formControls} />;
        }
        case "description": {
            return <DescriptionStep formControls={formControls} />;
        }
        case "priority": {
            return <PriorityStep formControls={formControls} />;
        }
        case "timeframe": {
            return <TimeframeStep formControls={formControls} />;
        }
        case "duration": {
            return <DurationStep formControls={formControls} />;
        }
        case "repeatCount": {
            return <RepeatCountStep formControls={formControls} />;
        }
        // default {
        //     return () => {

        //     }
        // }
    }
};
