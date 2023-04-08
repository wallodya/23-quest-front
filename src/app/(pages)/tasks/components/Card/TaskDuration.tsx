import { useNormilizedDuration } from "@task/hooks";
import { useTask } from "./TaskCard.provider";
import { useTimer } from "react-timer-hook";

export const TaskDuration = () => {
    const {
        task: { duration },
        isTimer,
        isPeriodic,
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
        return <div className={`italic`}>{durationClue}</div>;
        // return <div className={`mr-auto italic`}>{durationClue}</div>;
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

