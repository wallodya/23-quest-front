"use client";

import React, { useEffect, useMemo } from "react";
import { TaskCard } from "./Card";
import { useAppSelector } from "store";
import { useTaskFormState } from "@task/hooks";
import NewTask from "./Form/NewTask";
import { AnimatePresence } from "framer-motion";

export const ActiveTasks = () => {
    const { activeTasks, addedTasks } = useAppSelector((state) => state.tasks);
    // console.log("active tasks section")
    // const NewTasks = useMemo(() => {
    //     if (!addedTasks.length) {
    //         return () => (
    //                 <NewTask />
    //         );
    //     }
    //     return () => {
    //         return (
    //             <>
    //                 <NewTask/>
    //                 {addedTasks.map((task, index) => (
    //                     <TaskCard {...task} key={index}/>
    //                 ))}
    //             </>
    //         )
    //     }
    // },[addedTasks.length])
    return (
        <section className="mt-16 flex flex-col gap-4">
            <NewTask />
            {addedTasks.map((task, index) => (
                <TaskCard {...task} key={index} />
            ))}
            {activeTasks.map((task, index) => (
                <TaskCard {...task} key={index} />
            ))}
        </section>
    );
};

export default ActiveTasks;
