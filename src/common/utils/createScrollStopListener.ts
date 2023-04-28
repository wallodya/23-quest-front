import { RefObject } from "react";

export const createScrollStopListener = (
    elementRef: RefObject<HTMLElement>,
    callback: () => void,
    timeout?: number,
) => {
    let removed = false;
    let handle: NodeJS.Timeout | null = null;

    const onScroll = () => {
        if (handle) {
            clearTimeout(handle);
        }
        handle = setTimeout(callback, timeout ?? 200);
    };

    elementRef.current?.addEventListener("scroll", onScroll);

    return () => {
        if (removed) {
            return;
        }
        removed = true;
        if (handle) {
            clearTimeout(handle);
        }
        elementRef.current?.removeEventListener("scroll", onScroll);
    };
};
