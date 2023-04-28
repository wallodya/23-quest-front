import { ScrollLoop, ScrollLoopStep } from "components/ui/ScrollLoop";
import React from "react";

const SecondScrollStep = ({ value }: { value: number }) => {
    return (
        <p className="p-2.5 text-lg font-bold text-slate-100 flex justify-center items-center">{value}</p>
    );
};
const MinuteScrollStep = ({ value }: { value: number }) => {
    return (
        <p className="p-2.5 text-lg font-bold text-slate-100 flex justify-center items-center">{value}</p>
    );
};
const HourScrollStep = ({ value }: { value: number }) => {
    return (
        <p className="px-2.5 py-3 text-lg font-bold text-slate-100 flex justify-center items-center ">{value}</p>
    );
};

const HOUR_STEPS: ScrollLoopStep[] = Array(24 + 1)
    .fill(null)
    .map((_, index) => ({
        value: index,
        Component: () => <HourScrollStep value={index}/>,
        onSelect: (value) => console.log("hours: ", value)
    }));

const MINUTE_STEPS: ScrollLoopStep[] = Array(59 + 1)
    .fill(null)
    .map((_, index) => ({
        value: index,
        Component: () => <MinuteScrollStep value={index} />,
        onSelect: (value) => console.log("minutes: ", value)
    }));

const SECOND_STEPS: ScrollLoopStep[] = Array(59 + 1)
    .fill(null)
    .map((_, index) => ({
        value: index,
        Component: () => <SecondScrollStep value={index} />,
        onSelect: (value) => console.log("seconds: ", value)
    }));

const LabelFrame = () => {
    return (
        <div className="absolute bottom-0 right-4 w-24 h-full rounded-lg z-[-10] bg-slate-600/50" />
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

const DurationScrollInput = () => {
    return (
        <div className="flex h-[10rem] justify-between text-slate-700">
            <div className="col-start-1 flex h-full">
                <div className="w-14">
                    <ScrollLoop steps={HOUR_STEPS} scrollAxis="y" backup={1} />
                </div>

                <div className="flex h-full flex-col justify-center">
                    <Label text={"hours"} />
                </div>
            </div>
            <div className="col-start-2 flex h-full">
                <div className="w-14">
                    <ScrollLoop
                        steps={MINUTE_STEPS}
                        scrollAxis="y"
                        backup={1}
                    />
                </div>
                <div className="flex h-full flex-col justify-center">
                    <Label text={"min"} />
                </div>
            </div>
            <div className="col-start-3 flex h-full">
                <div className="w-14">
                    <ScrollLoop
                        steps={SECOND_STEPS}
                        scrollAxis="y"
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
