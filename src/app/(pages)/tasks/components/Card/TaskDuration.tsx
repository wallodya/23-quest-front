import { useNormilizedDuration } from "@task/hooks";
import { useTask } from "./TaskCard.provider";

export const TaskDuration = () => {
    const {
        task: { duration },
        isTimer,
        actions: {
            timer: { isTimerSet, timeValues},
        },
    } = useTask();
    const durationClue = useNormilizedDuration(duration);
    if (!isTimer || !durationClue) {
        return null;
    }
    if (!isTimerSet) {
        return <span className="text-sm text-gray-400">{durationClue}</span>;
    } 

    return (
        <div>
            <span>H:{timeValues.hours}</span>
            <span>M:{timeValues.minutes}</span>
            <span>S:{timeValues.seconds}</span>
        </div>
    )
};

