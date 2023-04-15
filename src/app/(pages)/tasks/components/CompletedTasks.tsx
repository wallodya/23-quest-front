"use client"

import React from "react";
import { TaskCard } from "./Card";
import { useAppSelector } from "store";

const CompletedTasks = () => {
    const { completedTasks } = useAppSelector((state) => state.tasks)
    return (
        <section className="grid grid-cols-cards gap-4">
            {completedTasks.map((task, index) => (
                <TaskCard {...task} isCompleted key={index} />
            ))}
        </section>
    );
};

export default CompletedTasks
