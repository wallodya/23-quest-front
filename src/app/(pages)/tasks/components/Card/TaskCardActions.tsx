import { useTaskTypeFlags } from "@task/hooks";
import { TaskType, isTaskType } from "@task/types";
import React, { useEffect, useState } from "react";
import { useTask } from "./TaskCard.provider";
import StopIcon from "components/icons/StopIcon";
import CheckIcon from "components/icons/CheckIcon";
import CrossIcon from "components/icons/CrossIcon";
import PauseIcon from "components/icons/PauseIcon";
import PlayIcon from "components/icons/PlayIcon";
import { toast } from "react-toastify";

const FailButton = () => {
    const {
        actions: {
            fail: { handleFn: handleFail, isLoading },
        },
    } = useTask();
    return (
        <button
            className="border-gray-950 bg-gray-950 hover:bg-red-950 rounded-lg border-2 px-3 py-1 text-sm font-bold text-red-800  transition hover:border-red-900 hover:text-red-600"
            onClick={handleFail}
        >
            {isLoading ? "..." : <CrossIcon size="xs" />}
        </button>
    );
};

const CompleteButton = () => {
    const {
        actions: {
            complete: {
                handleFn: handleComplete,
                isLoading,
                isError,
                isSuccess,
            },
        },
    } = useTask();
    return (
        <button
            className="border-gray-950 bg-gray-950 hover:bg-sky-950 rounded-lg border-2 px-3 py-1 text-sm font-bold text-sky-500 transition hover:border-sky-900 hover:text-sky-600"
            onClick={handleComplete}
        >
            {isLoading ? "..." : <CheckIcon size="xs" />}
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
        <button
            className="border-gray-950 bg-gray-950 hover:bg-sky-950 rounded-lg border-2 px-3 py-1 text-sm font-bold text-sky-500 transition hover:border-sky-900 hover:text-sky-600"
            onClick={handleCheck}
        >
            {isLoading ? "..." : <CheckIcon size="xs" />}
        </button>
    );
};

const StartButton = () => {
    const {
        actions: {
            timer: {
                restart,
                pause,
                resume,
                isRunning,
                isStarted,
                setIsStarted,
            },
        },
        task,
    } = useTask();
    // const [isStarted, setIsStarted] = useState<boolean>(false)
    const handleClick = () => {
        if (isRunning) {
            pause();
        } else {
            resume();
        }
        if (!isStarted) {
            setIsStarted(true);
        }
    };
    return (
        <button
            className="border-gray-950 bg-gray-950 hover:bg-sky-950 rounded-lg border-2 px-3 py-1 text-sm font-bold text-sky-500 transition hover:border-sky-900 hover:text-sky-600"
            onClick={handleClick}
        >
            {isRunning ? <PauseIcon size="xs" /> : <PlayIcon size="xs" />}
        </button>
    );
};

const StopButton = () => {
    const {
        task: { duration },
        actions: {
            timer: { setIsStarted, isStarted, restart },
        },
    } = useTask();
    const handleClick = () => {
        const expiresTime = new Date();
        expiresTime.setMilliseconds(
            expiresTime.getMilliseconds() + (duration ?? 1000),
        );
        restart(expiresTime, false);
        setIsStarted(false);
    };
    return (
        <button
            className="border-gray-950 bg-gray-950 rounded-lg border-2 px-3 py-1 text-sm font-bold text-orange-500 transition hover:border-orange-900 hover:bg-orange-950 hover:text-orange-600"
            onClick={handleClick}
        >
            <StopIcon size="xs" />
        </button>
    );
};

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
                    <StopButton />
                    <StartButton />
                </>
            ) : (
                <StartButton />
            );
        }

        // TODO if one repetition left: complete, otherwise: check + fail button for each rep
        const isCheckButton =
            isRepeat && repeatCount !== null && repeatCount > 1;
        if (isCheckButton) {
            return <CheckButton />;
        }
        return <CompleteButton />;
    };
    return (
        <div
            className={"ml-auto flex justify-end gap-4"}
            onClick={(event) => event.stopPropagation()}
        >
            <FailButton />
            <MainActionButton />
        </div>
    );
};

export default TaskCardActions;

