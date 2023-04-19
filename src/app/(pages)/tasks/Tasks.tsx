"use client";

import * as Tabs from "@radix-ui/react-tabs";
import ActiveTasks from "@task/components/ActiveTasks";
import FailedTasks from "@task/components/FailedTasks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "store";
import CompletedTasks from "./components/CompletedTasks";
import { useGetTasksQuery } from "./features/taskApi.slice";

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
            <Tabs.Root defaultValue="active" className="mt-16 sm:mt-20 mb-32">
                <Tabs.TabsList className="fixed left-0 bottom-0 z-10 md:static md:mb-4 flex w-screen md:w-full justify-around rounded-t-xl md:rounded-xl bg-slate-100 py-4 font-bold shadow shadow-slate-300 dark:bg-slate-700 dark:shadow-slate-900">
                    <Tabs.Trigger
                        value="active"
                        className={
                            "transition hover:text-sky-400 flex justify-center items-center data-[state=active]:text-sky-500 before:block before:relative before:mr-1 before:rounded-full before:w-2 before:h-2 data-[state=active]:before:bg-sky-500"
                        }
                    >
                        Active
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="completed"
                        className={
                            "transition hover:text-sky-400 flex justify-center items-center data-[state=active]:text-sky-500 before:block before:relative before:mr-1 before:rounded-full before:w-2 before:h-2 data-[state=active]:before:bg-sky-500"
                        }
                    >
                        Completed
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="failed"
                        className={
                            "transition hover:text-sky-400 flex justify-center items-center data-[state=active]:text-sky-500 before:block before:relative before:mr-1 before:rounded-full before:w-2 before:h-2 data-[state=active]:before:bg-sky-500"
                        }
                    >
                        Failed
                    </Tabs.Trigger>
                </Tabs.TabsList>
                <Tabs.Content value="active">
                    <ActiveTasks />
                </Tabs.Content>
                <Tabs.Content value="completed">
                    <CompletedTasks />
                </Tabs.Content>
                <Tabs.Content value="failed">
                    <FailedTasks />
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
};

export default Tasks;
