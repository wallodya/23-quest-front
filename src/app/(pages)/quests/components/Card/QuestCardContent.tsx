import { TaskCard } from "@task/components/Card";
import { motion } from "framer-motion";
import React from "react";
import { useAppSelector } from "store";



const QuestCardContent = () => {
    const { activeTasks } = useAppSelector((state) => state.tasks);
    return (
        <motion.div className="relative h-full px-4 overflow-hidden" layout>
            {/* <QuestHeader/> */}
            <div className="h-full  flex flex-col gap-2 overflow-y-auto">
                {activeTasks.map((task, index) => (
                    <TaskCard {...task} key={index} />
                ))}
            </div>
        </motion.div>
    );
};

export default QuestCardContent;
