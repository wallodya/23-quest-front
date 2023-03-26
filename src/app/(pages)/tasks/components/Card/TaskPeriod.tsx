import { useNormilizedTimePeriod } from "@task/hooks";

export const TaskPeriod = ({
    startTime,
    endTime,
}: {
    startTime: number | null;
    endTime: number | null;
}) => {
    const periodClue = useNormilizedTimePeriod(startTime, endTime);
    if (!startTime || !endTime) {
        return null;
    }

    return (
        <div className="mt-2 pt-4 border-t border-gray-400/20 text-xs italic text-gray-400">
            {periodClue?.from}
            <br />
            {periodClue?.to}
        </div>
    );
};
