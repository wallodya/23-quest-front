"use client"

import React from "react";
import { TaskCard } from "./Card";
import { useAppSelector } from "store";
import { useTaskFormState } from "@task/hooks";
import NewTask from "./Form/NewTask";

export const ActiveTasks = () => {
    const { activeTasks } = useAppSelector((state) => state.tasks)
    const {isShown} = useTaskFormState()
    return (
        <section className="mt-16 flex flex-col gap-4">
            <NewTask isShown={false}/>
            {activeTasks.map((task, index) => (
                <TaskCard {...task} key={index} />
            ))}
        </section>
    );
};

export default ActiveTasks
