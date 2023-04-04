import { useNormilizedDuration } from "@task/hooks";
import { useTask } from "./TaskCard.provider";

export const TaskDuration = () => {
    const { task: { duration }, isTimer} = useTask()
    const durationClue = useNormilizedDuration(duration);
    if (!isTimer || !durationClue) {
        return null;
    }

    return <span className="text-sm text-gray-400">{durationClue}</span>;
};

