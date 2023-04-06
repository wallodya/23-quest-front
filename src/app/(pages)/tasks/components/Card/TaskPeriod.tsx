import { useNormilizedTimePeriod } from "@task/hooks";
import { useTask } from "./TaskCard.provider";

export const TaskPeriod = () => {
    const {
        task: { startTime, endTime },
        isPeriodic,
    } = useTask();
    const periodClue = useNormilizedTimePeriod(startTime, endTime);
    if (!startTime || !endTime || !isPeriodic) {
        return null;
    }

    return (
        <div className="mt-4 pt-4 border-t border-gray-400/20 text-xs italic text-gray-400">
            From: {periodClue?.from}
            <br />
            To: {periodClue?.to}
        </div>
    );
};
