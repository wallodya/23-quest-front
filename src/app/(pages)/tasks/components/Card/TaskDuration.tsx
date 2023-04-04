import { useNormilizedDuration } from "@task/hooks";

export const TaskDuration = ({ duration, isTimer }: { duration: number | null, isTimer: boolean }) => {
    const durationClue = useNormilizedDuration(duration);
    if (!isTimer || !durationClue) {
        return null;
    }

    return <span className="text-sm text-gray-400">{durationClue}</span>;
};

