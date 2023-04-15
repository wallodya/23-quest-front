"use client"

import React from "react";
import { TaskCard } from "./Card";
import { useAppSelector } from "store";

export const FailedTasks = () => {
    const { failedTasks } = useAppSelector((state) => state.tasks)
    return (
        <section className="grid grid-cols-cards gap-4">
            {failedTasks.map((task, index) => (
                <TaskCard {...task} isFailed key={index} />
            ))}
        </section>
    );
};

export default FailedTasks
