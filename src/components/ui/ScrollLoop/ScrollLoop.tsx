import React, { useCallback, useLayoutEffect, useRef, useState } from "react";

type ScrollLoopProps = {
    steps: {
        value: any;
        Component: () => JSX.Element;
        onSelect?: () => void;
    }[];
    setCurrentValue?: () => void;
    scrollAxis: "y" | "x";
};

const useScrollContainerClassNames = (axis: "x" | "y") => {
    if (axis === "x") {
        return "overflow-x-scroll snap-x";
    } else {
        return "flex-col overflow-y-scroll snap-y";
    }
};

export const ScrollLoop = ({
    steps,
    setCurrentValue,
    scrollAxis,
}: ScrollLoopProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const axisClasses = useScrollContainerClassNames(scrollAxis);
    const [height, setHeight] = useState<number>(0);

    const backup = 4;
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
        <div className={`relative h-full w-fit`}>
            <div className="absolute top-0 h-1/6 w-full bg-gradient-to-b from-current to-transparent" />
            <div className="absolute bottom-0 h-1/6 w-full bg-gradient-to-t from-current to-transparent" />
            <div
                className={`h-full ${axisClasses}`}
                ref={scrollRef}
                onScroll={handleScroll}
            >
                {Array(backup)
                    .fill("")
                    .map(() => (
                        <div>
                            {steps.map(({ Component }, index) => (
                                <div className="snap-center" key={index}>
                                    <Component />
                                </div>
                            ))}
                        </div>
                    ))}
                <div ref={contentRef}>
                    {steps.map(({ Component }, index) => (
                        <div className="snap-center" key={index}>
                            <Component />
                        </div>
                    ))}
                </div>
                {Array(backup)
                    .fill("")
                    .map(() => (
                        <div>
                            {steps.map(({ Component }, index) => (
                                <div className="snap-center" key={index}>
                                    <Component />
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
};
