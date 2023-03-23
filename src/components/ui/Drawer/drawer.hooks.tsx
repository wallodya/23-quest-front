import { useState } from "react";
import { DrawerControls, DrawerOptions, UseDrawer } from "./drawer.types";

export type UseMobileDrawerType = () => {
    toggleDrawer: () => void;
    isDrawerOpen: boolean;
};

const register = (options: DrawerOptions): Required<DrawerOptions> => {
    const drawerOptions: Required<DrawerOptions> = {
        isAnimated: options?.isAnimated ?? true,
        isStyled: options?.isStyled ?? true,
        drawerPosition: options?.drawerPosition ?? "bottom",
        pages: options?.pages || null,
        excludePages: options?.excludePages || null,
    }

    return drawerOptions
}

export const useControls = (drawerOptions?: DrawerOptions): DrawerControls => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }
    const closeDrawer = () => {
        setIsOpen(false)
    }

    if (drawerOptions) {
        return {
            isOpen,
            toggleDrawer,
            closeDrawer,
            options: register(drawerOptions)
        }
    }

    return {
        isOpen,
        toggleDrawer,
        closeDrawer,
    }
}
