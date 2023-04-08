"use client";

import React, { useEffect } from "react";
import ActiveTasks from "@task/components/ActiveTasks";
import FailedTasks from "@task/components/FailedTasks";
import * as Tabs from "@radix-ui/react-tabs";
import Button from "components/ui/Button";
import CompletedTasks from "./components/CompletedTasks";
import { useGetTasksQuery } from "./features/taskApi.slice";
import { useAppSelector } from "store";
import NewTask from "./components/Form/NewTask";
import { useRouter } from "next/navigation";

const Tasks = () => {
    const { isSignedIn } = useAppSelector(state => state.user)
    const router = useRouter()

    useEffect(() => {
        if (!isSignedIn) {
            router.replace("/sign-in")
        }
    }, [isSignedIn])

    useGetTasksQuery(null);
    
    // TODO make selected tab trigger highlighted
    const [isActiveSelected, isCompletedSelected, isFailedSelected] = [false, false, false]
    return (
        <div>
            <Tabs.Root defaultValue="active" className="mt-16 mb-32">
                <Tabs.Content value="active">
                    <ActiveTasks />
                </Tabs.Content>
                <Tabs.Content value="completed">
                    <CompletedTasks />
                </Tabs.Content>
                <Tabs.Content value="failed">
                    <FailedTasks />
                </Tabs.Content>
                <Tabs.TabsList className="fixed left-0 bottom-0 z-30 flex w-screen justify-around rounded-t-xl bg-slate-100 py-4 font-bold shadow shadow-slate-300 dark:bg-slate-700 dark:shadow-slate-900">
                    <Tabs.Trigger
                        value="active"
                        className={
                            "transition hover:text-sky-500" +
                            (isActiveSelected ? " text-sky-500" : "")
                        }
                    >
                        Active
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="completed"
                        className={
                            "transition hover:text-sky-500" +
                            (isCompletedSelected ? " text-sky-500" : "")
                        }
                    >
                        Completed
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="failed"
                        className={
                            "transition hover:text-sky-500" +
                            (isFailedSelected ? " text-sky-500" : "")
                        }
                    >
                        Failed
                    </Tabs.Trigger>
                </Tabs.TabsList>
            </Tabs.Root>
        </div>
    );
};

export default Tasks;
