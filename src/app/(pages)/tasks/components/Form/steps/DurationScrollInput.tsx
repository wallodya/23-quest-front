import { ScrollLoop, ScrollLoopStep } from "components/ui/ScrollLoop";
import React, { useMemo } from "react";
import { UseFormSetValue } from "react-hook-form";
import { CreateTaskSchemaT } from "../createTask.schema";

const SecondScrollStep = ({ value }: { value: number }) => {
    return (
        <p className="flex items-center justify-center p-2.5 py-3 text-lg font-bold text-slate-100">
            {value}
        </p>
    );
};
const MinuteScrollStep = ({ value }: { value: number }) => {
    return (
        <p className="flex items-center justify-center p-2.5 py-3 text-lg font-bold text-slate-100">
            {value}
        </p>
    );
};
const HourScrollStep = ({ value }: { value: number }) => {
    return (
        <p className="flex items-center justify-center px-2.5 py-3 text-lg font-bold text-slate-100 ">
            {value}
        </p>
    );
};

const LabelFrame = () => {
    return (
        <div className="absolute bottom-0 right-4 z-[-10] h-full w-24 rounded-lg bg-slate-600/50" />
    );
};

const Label = ({ text }: { text: string }) => {
    return (
        <span className="relative  flex w-14 items-center justify-center rounded-r-lg bg-slate-600 px-2.5 py-3 text-sm text-gray-400">
            {text}
            <LabelFrame />
        </span>
    );
};

const useScrollDurationInputSteps = (setValue: UseFormSetValue<CreateTaskSchemaT>) => {
    const HOUR_STEPS: ScrollLoopStep<number>[] = useMemo(
        () =>
            Array(24 + 1)
                .fill(null)
                .map((_, index) => ({
                    value: index,
                    Component: () => <HourScrollStep value={index} />,
                    onSelect: (value) => {
                        setValue("durationHours", value)
                    }
                })),
        [],
    );

    const MINUTE_STEPS: ScrollLoopStep<number>[] = useMemo(
        () =>
            Array(59 + 1)
                .fill(null)
                .map((_, index) => ({
                    value: index,
                    Component: () => <MinuteScrollStep value={index} />,
                    onSelect: (value) =>{ 
                        setValue("durationMinutes", value)
                    }
                })),
        [],
    );

    const SECOND_STEPS: ScrollLoopStep<number>[] = useMemo(
        () =>
            Array(59 + 1)
                .fill(null)
                .map((_, index) => ({
                    value: index,
                    Component: () => <SecondScrollStep value={index} />,
                    onSelect: (value) => {
                        setValue("durationSeconds", value);
                    }
                })),
        [],
    );
    return {
        HOUR_STEPS,
        MINUTE_STEPS,
        SECOND_STEPS
    }
}

const DurationScrollInput = ({setValue}:{setValue: UseFormSetValue<CreateTaskSchemaT>}) => {
    const { HOUR_STEPS, MINUTE_STEPS, SECOND_STEPS } =
        useScrollDurationInputSteps(setValue);

    return (
        <div className="flex h-[10rem] justify-between text-slate-700">
            <div className="col-start-1 flex h-full">
                <div className="w-14">
                    <ScrollLoop<number>
                        steps={HOUR_STEPS}
                        scrollAxis="y"
                        backup={1}
                        initialValue={0}
                    />
                </div>

                <div className="flex h-full flex-col justify-center">
                    <Label text={"hours"} />
                </div>
            </div>
            <div className="col-start-2 flex h-full">
                <div className="w-14">
                    <ScrollLoop<number>
                        steps={MINUTE_STEPS}
                        scrollAxis="y"
                        backup={1}
                        initialValue={5}
                    />
                </div>
                <div className="flex h-full flex-col justify-center">
                    <Label text={"min"} />
                </div>
            </div>
            <div className="col-start-3 flex h-full">
                <div className="w-14">
                    <ScrollLoop<number>
                        steps={SECOND_STEPS}
                        scrollAxis="y"
                        initialValue={0}
                        backup={1}
                    />
                </div>

                <div className="flex h-full flex-col justify-center">
                    <Label text={"sec"} />
                </div>
            </div>
        </div>
    );
};

export default DurationScrollInput;
