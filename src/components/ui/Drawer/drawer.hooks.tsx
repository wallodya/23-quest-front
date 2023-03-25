import { useState } from "react";
import {
    DrawerControls,
    DrawerOptions,
    DrawerPositions
} from "./drawer.types";

const ANIMATION_DURATION = 0.3;
const ANIMATION_EXIT_DURATION = 0.3;

export type UseMobileDrawerType = () => {
    toggleDrawer: () => void;
    isDrawerOpen: boolean;
};

export const getDrawerOptions = (
    options: DrawerOptions,
): Required<DrawerOptions> => {
    const drawerOptions: Required<DrawerOptions> = {
        isAnimated: options?.isAnimated ?? true,
        isStyled: options?.isStyled ?? true,
        drawerPosition: options?.drawerPosition ?? "left",
        pages: options?.pages || null,
        excludePages: options?.excludePages || null,
    };

    return drawerOptions;
};

export const useControls = (): DrawerControls => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const closeDrawer = () => {
        setIsOpen(false);
    };
    return {
        isOpen,
        toggleDrawer,
        closeDrawer,
    };
};

export const useDrawerPositionClasses = (position: DrawerPositions) => {
    switch (position) {
        case "bottom": {
            return "flex flex-col justify-end";
        }
        case "left": {
            return "flex";
        }
        case "right": {
            return "flex justify-end";
        }
        case "top": {
            return "flex flex-col";
        }
    }
};

export const useDrawerContentPositionClasses = (position: DrawerPositions) => {
    switch (position) {
        case "bottom": {
            return "w-full min-h-60";
        }
        case "left": {
            return "h-full w-72";
        }
        case "right": {
            return "h-full w-62";
        }
        case "top": {
            return "w-full min-h-60";
        }
    }
};

export const useDrawerDisplayClass = (isOpen: boolean) => {
    return isOpen ? "" : "pointer-events-none";
};

type UseDrawerAnimation = (position: DrawerPositions) => {
    initial: object;
    animate: object;
    exit: object;
};
export const useDrawerContentAnimation: UseDrawerAnimation = (position) => {
    switch (position) {
        case "bottom": {
            const initial = {
                translateY: 500,
            };
            const animate = {
                translateX: 0,
                translateY: 0,
                transition: {
                    duration: ANIMATION_DURATION,
                    ease: "easeOut",
                },
            };
            const exit = {
                translateY: 500,
                transition: {
                    duration: ANIMATION_EXIT_DURATION,
                    ease: "easeOut",
                },
            };
            return {
                initial,
                animate,
                exit,
            };
        }
        case "left": {
            const initial = {
                translateX: -300,
            };
            const animate = {
                translateX: 0,
                translateY: 0,
                transition: {
                    duration: ANIMATION_DURATION,
                    ease: "easeOut",
                },
            };
            const exit = {
                translateX: -300,
                transition: {
                    duration: ANIMATION_EXIT_DURATION,
                    ease: "easeOut",
                },
            };
            return {
                initial,
                animate,
                exit,
            };
        }
        case "right": {
            const initial = {
                translateX: 300,
            };
            const animate = {
                translateX: 0,
                translateY: 0,
                transition: {
                    duration: ANIMATION_DURATION,
                    ease: "easeOut",
                },
            };
            const exit = {
                translateX: 300,
                transition: {
                    duration: ANIMATION_EXIT_DURATION,
                    ease: "easeOut",
                },
            };
            return {
                initial,
                animate,
                exit,
            };
        }
        case "top": {
            const initial = {
                translateY: -600,
            };
            const animate = {
                translateX: 0,
                translateY: 0,
                transition: {
                    duration: ANIMATION_DURATION,
                    ease: "easeOut",
                },
            };
            const exit = {
                translateY: -600,
                transition: {
                    duration: ANIMATION_EXIT_DURATION,
                    ease: "easeOut",
                },
            };
            return {
                initial,
                animate,
                exit,
            };
        }
    }
};

export const useDrawerBackgroundGradientClasses = (
    position: DrawerPositions,
) => {
    switch (position) {
        case "bottom": {
            return "bg-gradient-to-t from-slate-800";
        }
        case "left": {
            return "bg-gradient-to-r from-slate-800 ";
        }
        case "right": {
            return "bg-gradient-to-l from-slate-800";
        }
        case "top": {
            return "bg-gradient-to-b from-slate-800";
        }
    }
};

export const useDrawerBackgroundAnimation: UseDrawerAnimation = (position) => {
    switch (position) {
        case "bottom": {
            const initial = {
                opacity: 0,
                translateY: 700,
            };
            const animate = {
                opacity: 1,
                translateY: 0,
                transition: {
                    duration: ANIMATION_DURATION,
                },
            };
            const exit = {
                opacity: 0,
                translateY: 700,
                transition: {
                    duration: ANIMATION_EXIT_DURATION,
                },
            };
            return { initial, animate, exit };
        }
        case "left": {
            const initial = {
                opacity: 0,
                translateX: -400,
            };
            const animate = {
                opacity: 1,
                translateX: 0,
                transition: {
                    duration: ANIMATION_DURATION,
                },
            };
            const exit = {
                opacity: 0,
                translateX: -400,
                transition: {
                    duration: ANIMATION_EXIT_DURATION,
                },
            };
            return { initial, animate, exit };
        }
        case "right": {
            const initial = {
                opacity: 0,
                translateX: 400,
            };
            const animate = {
                opacity: 1,
                translateX: 0,
                transition: {
                    duration: ANIMATION_DURATION,
                },
            };
            const exit = {
                opacity: 0,
                translateX: 400,
                transition: {
                    duration: ANIMATION_EXIT_DURATION,
                },
            };
            return { initial, animate, exit };
        }
        case "top": {
            const initial = {
                opacity: 0,
                translateY: -700,
            };
            const animate = {
                opacity: 1,
                translateY: 0,
                transition: {
                    duration: ANIMATION_DURATION,
                },
            };
            const exit = {
                opacity: 0,
                translateY: -700,
                transition: {
                    duration: ANIMATION_EXIT_DURATION,
                },
            };
            return { initial, animate, exit };
        }
    }
};
