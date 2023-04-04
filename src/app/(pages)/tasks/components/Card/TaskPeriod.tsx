import { useNormilizedTimePeriod } from "@task/hooks";

export const TaskPeriod = ({
    startTime,
    endTime,
    isPeriodic,
}: {
    startTime: number | null;
    endTime: number | null;
    isPeriodic: boolean
}) => {
    const periodClue = useNormilizedTimePeriod(startTime, endTime);
    if (!startTime || !endTime || !isPeriodic) {
        return null;
    }

    return (
        <div className="mt-4 pt-4 border-t border-gray-400/20 text-xs italic text-gray-400">
            {periodClue?.from}
            <br />
            {periodClue?.to}
        </div>
    );
};
