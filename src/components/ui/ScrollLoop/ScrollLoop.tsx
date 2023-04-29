import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./scrollbar.module.css";
import { useScrollStop } from "common/hooks";

export type ScrollLoopStep<TValue=unknown> = {
    readonly value: TValue;
    readonly Component: () => JSX.Element;
    readonly onSelect?: (value: TValue) => void;
};

type ScrollLoopProps<TValue=unknown> = {
    readonly setCurrentValue?: () => void;
    readonly scrollAxis: "y" | "x";
    readonly steps: ScrollLoopStep<TValue>[];
    readonly backup?: number;
    readonly initialValue?: TValue; 
};

const useScrollContainerClassNames = (axis: "x" | "y") => {
    if (axis === "x") {
        return "overflow-x-scroll items-center snap-x";
    } else {
        return "flex-col items-center overflow-y-scroll snap-y";
    }
};

const ScrollContent = ({ steps }: { steps: ScrollLoopStep<any>[] }) => {
    return (
        <>
            {steps.map(({ Component }, index) => (
                <div className="snap-center" key={index}>
                    <Component />
                </div>
            ))}
        </>
    );
};

export const ScrollLoop = <TValue=unknown>({
    backup,
    steps,
    setCurrentValue,
    scrollAxis,
    initialValue,
}: ScrollLoopProps<TValue>) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const axisClasses = useScrollContainerClassNames(scrollAxis);
    const [height, setHeight] = useState<number>(0);
    const [stepHeight, setStepHeight] = useState<number>(0)

    backup ??= 4;
    const backupHeight = backup * height;

    const handleScroll = useCallback(() => {
        if (scrollRef.current) {
            const scroll = scrollRef.current.scrollTop;
            if (scroll < backupHeight || scroll >= backupHeight + height) {
                scrollRef.current.scrollTop = backupHeight + (scroll % height);
            }


        }
    }, [height]);

    useLayoutEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.offsetHeight);
            setStepHeight(height / steps.length)
            if (scrollRef.current) {
                scrollRef.current.scrollTop = backupHeight;
            }
        }
    });

    useScrollStop(scrollRef, () => {

        const stepsAmount = Math.floor(height / stepHeight)
        const centerStep = Math.round(stepsAmount % 2 === 0 ? stepsAmount / 2 + 1: stepsAmount / 2) 

        const scrollTop = (scrollRef.current?.scrollTop ?? 0) % height

        const stepsFromTop = Math.floor(scrollTop / stepHeight)
        const currentStepCenterDelta = centerStep + stepsFromTop - stepsAmount - 1
        const currentStep =
            currentStepCenterDelta >= 0
                ? currentStepCenterDelta
                : currentStepCenterDelta + stepsAmount;

        const onCurrentStepSelected = steps[currentStep]?.onSelect
        if (onCurrentStepSelected && steps[currentStep]?.value !== undefined) {
            const step = steps[currentStep]
            if (step !== undefined) {
                onCurrentStepSelected(step.value)
            }
        }
    }, 500)

    const initialStep: number | null = useMemo(() => {
        if (initialValue === undefined) {
            return null
        }

        const step = steps.findIndex((step) => step.value === initialValue)

        return step !== -1 ? step : null;
    }, [initialValue, steps.length]);

    return (
        <div className={`relative h-full w-full flex items-center justify-center overflow-hidden`}>
            <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-current to-transparent pointer-events-none" />
            <div
                className={`flex h-full ${axisClasses} ${styles["scroll-content"]} snap-mandatory`}
                ref={scrollRef}
                style={{ height }}
                onScroll={handleScroll}
            >
                {Array(backup)
                    .fill("")
                    .map((_, index) => (
                        <div key={index}>
                            <ScrollContent steps={steps} />
                        </div>
                    ))}
                <div ref={contentRef}>
                    <ScrollContent steps={steps} />
                </div>
                {Array(backup)
                    .fill("")
                    .map((_, index) => (
                        <div key={index}>
                            <ScrollContent steps={steps} />
                        </div>
                    ))}
            </div>
            <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-current to-transparent pointer-events-none" />
        </div>
    );
};
