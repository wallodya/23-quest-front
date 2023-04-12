"use client";

import { useAppDispatch, useAppSelector } from "store";
import { TaskCard } from "./Card";
import NewTask from "./Form/NewTask";
import { useGetTasksQuery } from "@task/features/taskApi.slice";
import { useEffect } from "react";
import { useSubmitTask } from "@task/hooks";
import { closeTaskForm } from "@task/features";

export const ActiveTasks = () => {
    const { activeTasks, taskForm: { isOpen } } = useAppSelector((state) => state.tasks);
    const dispatch = useAppDispatch()
    const closeForm = () => {
        dispatch(closeTaskForm())
    }
    const { submitTask } = useSubmitTask(false);
    // TODO add optimistic updates
    return (
        <section className="flex flex-col gap-4">
            {/* {addedTasks.map((task, index) => (
                <TaskCard {...task} key={index} />
            ))} */}
            <NewTask submitTaskFn={submitTask} isOpen={isOpen} closeFn={closeForm}/>
            {activeTasks.map((task, index) => (
                <TaskCard {...task} key={task.uniqueTaskId} />
            ))}
        </section>
    );
};

export default ActiveTasks;
