import { useNormilizedDuration } from "@task/hooks";
import { useTask } from "./TaskCard.provider";
import { useTimer } from "react-timer-hook";

export const TaskDuration = () => {
    const {
        task: { duration },
        isTimer,
        actions: { timer: {
            isStarted,
            isRunning,
            hours,
            minutes,
            seconds
        }}
    } = useTask();
    const durationClue = useNormilizedDuration(duration);
    if (!isTimer || !durationClue) {
        return null;
    }
    // console.log("isstarted: ", isStarted)
    if (!isStarted) {
        return <span className="text-sm text-gray-400">{durationClue}</span>;
    } 

    return (
        <div>
            <span>{hours}</span>
            <span>:</span>
            <span>{("0" + String(minutes)).slice(-2)}</span>
            <span>:</span>
            <span>{("0" + String(seconds)).slice(-2)}</span>
        </div>
    )
};

