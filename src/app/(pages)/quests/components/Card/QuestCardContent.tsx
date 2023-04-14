import { TaskCard } from "@task/components/Card";
import { motion } from "framer-motion";
import React from "react";
import { useAppSelector } from "store";
import { useQuest } from "./questCard.provider";



const QuestCardContent = () => {
    const { uniqueQuestId } = useQuest()
    const { tasks }= useQuest()
    console.log("tasks for quest ", uniqueQuestId)
    console.log(tasks)
    return (
        <motion.div className="relative h-full overflow-hidden px-4" layout>
            <div className="flex py-6 h-full flex-col gap-4 overflow-y-auto">
                {tasks === "loading" ? (
                    <div>loading tasks</div>
                ) : (
                    tasks.map((task, index) => (
                        <TaskCard {...task} key={index} />
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default QuestCardContent;
