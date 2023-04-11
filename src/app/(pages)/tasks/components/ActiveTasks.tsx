"use client";

import { useAppSelector } from "store";
import { TaskCard } from "./Card";
import NewTask from "./Form/NewTask";
import { useGetTasksQuery } from "@task/features/taskApi.slice";
import { useEffect } from "react";
import { useSubmitTask } from "@task/hooks";

export const ActiveTasks = () => {
    const { activeTasks, addedTasks } = useAppSelector((state) => state.tasks);
    const { submitTask } = useSubmitTask(false);
    // TODO add optimistic updates
    return (
        <section className="flex flex-col gap-4">
            {/* {addedTasks.map((task, index) => (
                <TaskCard {...task} key={index} />
            ))} */}
            <NewTask submitTaskFn={submitTask}/>
            {activeTasks.map((task, index) => (
                <TaskCard {...task} key={task.uniqueTaskId} />
            ))}
        </section>
    );
};

export default ActiveTasks;
