import { Task } from "@task/types";
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

export const useQuestCardStats = (tasks: Task[]) => {
    const taskAmount = tasks.length
    const failedTaskAmount = tasks.filter(task => task.isFailed).length
    const completedTaskAmount = tasks.filter(task => task.isCompleted).length
    const activeTaskAmount = tasks.filter(task => !task.isCompleted && !task.isFailed).length
    const percentageFailed = Math.floor( (failedTaskAmount / taskAmount) * 100 )
    const percentageCompleted = Math.floor( (completedTaskAmount / taskAmount) * 100 )
    const percentageActive = Math.floor( (activeTaskAmount / taskAmount) * 100 )
    const percentageDone = 100 - percentageActive
    return {
        taskAmount,
        failedTaskAmount,
        completedTaskAmount,
        activeTaskAmount,
        percentageFailed,
        percentageCompleted,
        percentageActive,
        percentageDone,
    };
}
