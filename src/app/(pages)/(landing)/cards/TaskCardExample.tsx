import CheckIcon from "components/icons/CheckIcon";
import CrossIcon from "components/icons/CrossIcon";
import React from "react";
import { PeriodicChip } from "./TypesExamples";

export const TaskCardExample = ({
    isInQuest,
    title,
}: {
    isInQuest?: boolean;
    title?: string;
}) => {
    isInQuest ??= false
    title ??= "Example task";
    return (
        <div
            className={`w-fit flex flex-col rounded-xl ${isInQuest ? "bg-gray-800" : "bg-gray-900"} px-6 py-5 shadow shadow-slate-900`}
        >
            <div className="flex items-baseline justify-between">
                <p className="font-bold">{title}</p>
                <span className={`text-xs italic text-sky-700`}>medium</span>
            </div>
            <div className="mt-1 flex flex-wrap justify-between gap-1 border-t border-gray-400/20 pt-1 text-xs text-gray-400">
                <div className="">
                    Apr 28, 2023 4:00 PM &#8212; May 2, 2023 5:00 PM
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                <PeriodicChip />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
                <div className={"ml-auto flex justify-end gap-4"}>
                    <div className="rounded-lg border-2 border-red-500/70 px-3 py-1 text-sm font-bold text-red-500/70">
                        <CrossIcon size="xs" />
                    </div>
                    <div className="rounded-lg border-2 border-sky-500 bg-sky-500 px-3 py-1 text-sm font-bold">
                        <CheckIcon size="xs" />
                    </div>
                </div>
            </div>
        </div>
    );
};
