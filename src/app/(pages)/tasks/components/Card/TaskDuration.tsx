import { useNormilizedDuration } from "@task/hooks";

export const TaskDuration = ({ duration }: { duration: number | null }) => {
    const durationClue = useNormilizedDuration(duration);

    if (!duration) {
        return null;
    }

    return <span className="text-sm text-gray-400">{durationClue}</span>;
};

