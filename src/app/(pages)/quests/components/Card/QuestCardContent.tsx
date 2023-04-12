import { TaskCard } from "@task/components/Card";
import { motion } from "framer-motion";
import React from "react";
import { useAppSelector } from "store";
import { useQuest } from "./questCard.provider";



const QuestCardContent = () => {
    const { uniqueQuestId } = useQuest()
    const tasks = useAppSelector((state) => state.quests.tasksInQuests[uniqueQuestId]);
    // console.log("tasks for quest ", uniqueQuestId)
    // console.log(tasks)
    return (
        <motion.div className="relative h-full px-4 overflow-hidden" layout>
            <div className="h-full  flex flex-col gap-2 overflow-y-auto">
                {tasks && tasks.map((task, index) => (
                    <TaskCard {...task} key={index} />
                ))}
            </div>
        </motion.div>
    );
};

export default QuestCardContent;
