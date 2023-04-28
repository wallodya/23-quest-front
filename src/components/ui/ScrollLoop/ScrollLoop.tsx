import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import styles from "./scrollbar.module.css";

export type ScrollLoopStep = {
    value: any;
    Component: () => JSX.Element;
    onSelect?: () => void;
};

type ScrollLoopProps = {
    steps: ScrollLoopStep[];
    setCurrentValue?: () => void;
    scrollAxis: "y" | "x";
    backup?: number
};

const useScrollContainerClassNames = (axis: "x" | "y") => {
    if (axis === "x") {
        return "overflow-x-scroll items-center snap-x";
    } else {
        return "flex-col items-center overflow-y-scroll snap-y";
    }
};

const ScrollContent = ({ steps }: { steps: ScrollLoopStep[] }) => {
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

export const ScrollLoop = ({
    backup,
    steps,
    setCurrentValue,
    scrollAxis,
}: ScrollLoopProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const axisClasses = useScrollContainerClassNames(scrollAxis);
    const [height, setHeight] = useState<number>(0);

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
            if (scrollRef.current) {
                scrollRef.current.scrollTop = backupHeight;
            }
        }
    });

    return (
        <div className={`relative h-full w-full flex items-center justify-center overflow-hidden`}>
            <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-current to-transparent" />
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
            <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-t from-current to-transparent" />
        </div>
    );
};
