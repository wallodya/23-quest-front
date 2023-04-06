"use client";

import { useAppSelector } from "store";
import { TaskCard } from "./Card";
import NewTask from "./Form/NewTask";
import { useGetTasksQuery } from "@task/features/taskApi.slice";
import { useEffect } from "react";

export const ActiveTasks = () => {
    const { activeTasks, addedTasks } = useAppSelector((state) => state.tasks);
    return (
        <section className="flex flex-col gap-4">
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
