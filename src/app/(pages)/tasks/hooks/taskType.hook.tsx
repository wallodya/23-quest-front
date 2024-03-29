import { BasicTaskType, ModifiedTaskType, TaskType, TaskTypeChipProps } from "@task/types";
import PeriodIcon from "components/icons/PeriodIcon";
import RepeatIcon from "components/icons/RepeatIcon";
import TimerIcon from "components/icons/TimerIcon";
import moment from "moment";
import { number } from "zod";

export const basicChipProps = {
    label: "Basic",
    textColor: "text-neutral-400",
    outlineColor: "border-neutral-400",
    Icon: () => <></>,
}

const typeChipMap = new Map<BasicTaskType | ModifiedTaskType, TaskTypeChipProps>([
    [
        "BASIC",
        basicChipProps,
    ],
    [
        "PERIODIC",
        {
            label: "Periodic",
            textColor: "text-sky-700",
            outlineColor: "border-sky-700",
            Icon: () => <PeriodIcon size="xxs"/>,
        },
    ],
    [
        "REPEAT",
        {
            label: "Repeat",
            textColor: "text-violet-500",
            outlineColor: "border-violet-500",
            Icon: () => <RepeatIcon size="xxs"/>,
        },
    ],
    [
        "TIMER",
        {
            label: "Timer",
            textColor: "text-fuchsia-600",
            outlineColor: "border-fuchsia-600",
            Icon: () => <TimerIcon size="xxs"/>
        },
    ],
]);

export const useTypeChipProps = (types: TaskType) => {
    return types.map(type => typeChipMap.get(type) ?? basicChipProps)
}

export const useTaskTypeFlags = (types: TaskType) => {
    return {
        isBasic: types.includes("BASIC"),
        isPeriodic: types.includes("PERIODIC" as ModifiedTaskType),
        isTimer: types.includes("TIMER" as ModifiedTaskType),
        isRepeat: types.includes("REPEAT" as ModifiedTaskType),
    };
} //TODO add this to task form components

export const useValidTimePeriod = ({
    isPeriodic,
    startTime,
    endTime,
}: {
    isPeriodic: boolean;
    startTime: Date | null;
    endTime: Date | null;
}): boolean => {
    if (!isPeriodic) {
        return true
    }
    if (startTime === null || endTime === null) {
        return false
    }

    const currentTime = moment()

    const isPeriodValid = moment(startTime).isBefore(currentTime) && moment(endTime).isAfter(currentTime)
    return isPeriodValid
}; // TODO better typing


