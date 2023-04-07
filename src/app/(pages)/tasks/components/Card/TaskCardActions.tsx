import { useTaskTypeFlags } from "@task/hooks";
import { TaskType, isTaskType } from "@task/types";
import React, { useState } from "react";
import { useTask } from "./TaskCard.provider";

const FailButton = () => {
    const {
        actions: {
            fail: { handleFn: handleFail, isLoading },
        },
    } = useTask();
    return (
        <button className="rounded-lg px-2 py-1 text-sm font-bold text-red-400" onClick={handleFail}>
            {isLoading? "..." : "Fail"}
        </button>
    );
};

const CompleteButton = () => {
    const {actions: {complete: {handleFn: handleComplete, isLoading}}} = useTask()
    return (
        <button className="rounded-lg bg-sky-500/80 px-2 py-1 text-sm font-bold" onClick={handleComplete}>
            {isLoading ? "..." : "Done"}
        </button>
    );
};

const CheckButton = () => {
    const {
        actions: {
            check: { handleFn: handleCheck, isLoading },
        },
    } = useTask();
    return (
        <button className="rounded-lg border border-sky-500/80 px-2 py-1 text-sm font-bold" onClick={handleCheck}>
            {isLoading ? "..." : "Check"}
        </button>
    )
}

const StartButton = () => {
    const {
        actions: {
            timer: {
                restart,
                pause,
                resume,
                isRunning,
                isStarted,
                setIsStarted
            }
        },
        task
    } = useTask()
    // const [isStarted, setIsStarted] = useState<boolean>(false)
    const handleClick = () => {
        if (isRunning) {
            pause()
        } else {
                resume()
        }
        if (!isStarted) {
            setIsStarted(true)
        }
    }
    return (
        <button className="rounded-lg border border-sky-500/80 px-2 py-1 text-sm font-bold" onClick={handleClick}>
            {isRunning ? "Pause" : "Start"}
        </button>
    )
}

const StopButton = () => {
    const {
        task: { duration },
        actions: {
            timer: { setIsStarted, isStarted, restart },
        },
    } = useTask();
    const handleClick = () => {
        const expiresTime = new Date()
        expiresTime.setMilliseconds(expiresTime.getMilliseconds() + (duration ?? 1000))
        restart(expiresTime, false)
        setIsStarted(false)
    }
    return (
        <button
            className="rounded-lg border border-sky-500/80 px-2 py-1 text-sm font-bold"
            onClick={handleClick}
        >
            Reset
        </button>
    );
}

const TaskCardActions = () => {
    const {
        task: { types, repeatCount },
        areActionsShown: isShown,
        isRepeat,
        isTimer,
        actions: {
            timer: { isStarted },
        },
    } = useTask();
    if (!isShown) {
        return null;
    }
    const MainActionButton = () => {
        if (isTimer) {
            // TODO start button (timer starts), completes after timeout + fail button always
            return isStarted ? (
                <>
                    <StopButton/>
                    <StartButton />
                </>
            ) : (
                <StartButton />
            );
        }

        // TODO if one repetition left: complete, otherwise: check + fail button for each rep
        const isCheckButton = isRepeat && repeatCount !== null && repeatCount > 1 
        if (isCheckButton) {
            
            return <CheckButton/>
        }
        return <CompleteButton/>
    }
    return (
        <div className={"mt-4 flex justify-end gap-4"}>
            <FailButton />
            <MainActionButton/>
        </div>
    );
};

export default TaskCardActions;

// TODO make appropriate buttons
//TODO add actual handlers to buttons
