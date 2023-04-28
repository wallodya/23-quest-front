import { createScrollStopListener } from "common/utils";
import { RefObject, useEffect, useRef } from "react";

export const useScrollStop = (
    elementRef: RefObject<HTMLElement>,
    callback: () => void,
    timeout?: number,
) => {
    const callbackRef = useRef<() => void>()
    callbackRef.current = callback

    useEffect(() => {
        const removeListener = createScrollStopListener(
            elementRef,
            () => {
                if (callbackRef.current) {
                    callbackRef.current();
                }
            },
            timeout,
        );
        return () => removeListener()
    }, [elementRef])
};