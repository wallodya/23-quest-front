"use client";

import { useAppDispatch, useAppSelector } from "store";
import { TaskCard } from "./Card";
import NewTask from "./Form/NewTask";
import { useGetTasksQuery } from "@task/features/taskApi.slice";
import { useEffect } from "react";
import { useSubmitTask } from "@task/hooks";
import { closeTaskForm, openTaskForm, selectTasksSlice } from "@task/features";

export const ActiveTasks = () => {
    const { activeTasks, taskForm: { isOpen } } = useAppSelector(selectTasksSlice());
    const dispatch = useAppDispatch()
    const closeForm = () => {
        dispatch(closeTaskForm())
    }
    const toggleFormModal = (open: boolean) => {
        if (open) {
            dispatch(openTaskForm())
        } else {
            dispatch(closeTaskForm())
        }
    }
    const { submitTask } = useSubmitTask(false);
    // TODO add optimistic updates
    return (
        <section className="flex flex-col md:grid md:grid-cols-cards gap-4">
            {/* {addedTasks.map((task, index) => (
                <TaskCard {...task} key={index} />
            ))} */}
            <NewTask submitTaskFn={submitTask} isOpen={isOpen} closeFn={closeForm} toggleModalFn={toggleFormModal}/>
            {activeTasks.map((task, index) => (
                <TaskCard {...task} key={task.uniqueTaskId} />
            ))}
        </section>
    );
};

export default ActiveTasks;
