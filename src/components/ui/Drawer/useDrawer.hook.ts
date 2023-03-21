import { useState } from "react";

export type UseMobileDrawerType = () => {
    toggleDrawer: () => void;
    isDrawerOpen: boolean;
};


const useDrawer: UseMobileDrawerType = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return {
        toggleDrawer,
        isDrawerOpen,
    };
};

export default useDrawer
