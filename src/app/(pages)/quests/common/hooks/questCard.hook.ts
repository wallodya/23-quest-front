import { useState } from "react";

export const useQuestCardControls = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    return {
        isOpen,
        toggleOpen
    }
}

export const useQuestCardActions = (questId: string) => {
    const addTask = () => {}
    return {
        addTask
    }
}

export const useQuestCardStats = (questId: string) => {
    
}
