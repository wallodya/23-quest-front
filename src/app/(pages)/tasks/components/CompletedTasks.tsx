"use client"

import React from "react";
import { TaskCard } from "./Card";
import { useAppSelector } from "store";

const CompletedTasks = () => {
    const { completedTasks } = useAppSelector((state) => state.tasks)
    return (
        <section className="flex flex-col gap-4">
            {completedTasks.map((task, index) => (
                <TaskCard {...task} isCompleted key={index} />
            ))}
        </section>
    );
};

export default CompletedTasks