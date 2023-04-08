import { useNormilizedTimePeriod } from "@task/hooks";
import { useTask } from "./TaskCard.provider";

export const TaskPeriod = () => {
    const {
        task: { startTime, endTime },
        isPeriodic,
        isTimer
    } = useTask();
    const periodClue = useNormilizedTimePeriod(startTime, endTime);
    if (!startTime || !endTime || !isPeriodic) {
        return null;
    }

    return (
        // <div className="mt-4 pt-4 border-t border-gray-400/20 text-xs italic text-gray-400">
        <div className="">
            {periodClue?.from} &#8212; {periodClue?.to}
        </div>
    );
};
