import { useTaskTypeFlags } from "@task/hooks";
import { TaskType } from "@task/types";
import React from "react";

const FailButton = () => {
    return (
        <button className="rounded-lg px-2 py-1 text-sm font-bold text-red-400">
            Failed
        </button>
    );
};

const CompleteButton = () => {
    return (
        <button className="rounded-lg bg-sky-500/80 px-2 py-1 text-sm font-bold">
            Complete
        </button>
    );
};

const CheckButton = () => {
    return (
        <button className="rounded-lg border border-sky-500/80 px-2 py-1 text-sm font-bold">
            Check
        </button>
    )
}

const StartButton = () => {
    return (
        <button className="rounded-lg border border-sky-500/80 px-2 py-1 text-sm font-bold">
            Start
        </button>
    )
}

const TaskCardActions = ({
    isShown,
    types,
    repeatCount
}: {
    types: TaskType;
    isShown: boolean;
    repeatCount: number | null;
}) => {
    const {
        isBasic,
        isRepeat, // TODO if one repetition left: complete, otherwise: check + fail button for each rep
        isTimer, // TODO start button (timer starts), completes after timeout + fail button always
    } = useTaskTypeFlags(types);
    if (!isShown) {
        return null;
    }
    const MainActionButton = () => {
        if (isTimer) {
            return <StartButton/>
        }

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
