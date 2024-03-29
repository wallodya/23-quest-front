import { TaskCard } from "@task/components/Card";
import { motion } from "framer-motion";
import React from "react";
import { useAppSelector } from "store";
import { useQuest } from "./questCard.provider";



const QuestCardContent = () => {
    const { uniqueQuestId } = useQuest()
    const { tasks }= useQuest()
    return (
        <motion.div className="relative h-full overflow-hidden px-4" layout>
            {/* <div className="flex py-6 h-full flex-col gap-4 overflow-y-auto"> */}
            <div className="h-full  overflow-y-auto py-6">
                <div className="grid md:grid-cols-2 lg:gris-cols-3 xl:grid-cols-3 gap-4 ">
                    {tasks === "loading" ? (
                        <div>loading tasks</div>
                    ) : (
                        tasks.map((task, index) => (
                            <TaskCard {...task} key={index} />
                        ))
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default QuestCardContent;
