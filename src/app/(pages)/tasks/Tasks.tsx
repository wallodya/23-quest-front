"use client";

import * as Tabs from "@radix-ui/react-tabs";
import ActiveTasks from "@task/components/ActiveTasks";
import FailedTasks from "@task/components/FailedTasks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "store";
import CompletedTasks from "./components/CompletedTasks";
import { useGetTasksQuery } from "./features/taskApi.slice";
import Button from "components/ui/Button";
import { toast } from "react-toastify";

const Tasks = () => {
    const { isSignedIn } = useAppSelector(state => state.user)
    const router = useRouter()

    useEffect(() => {
        if (!isSignedIn) {
            router.replace("/sign-in")
        }
    }, [isSignedIn])

    useGetTasksQuery(null);
    
    return (
        <div>
            <Tabs.Root defaultValue="active" className="mt-16 mb-32 sm:mt-20">
                <Tabs.TabsList className="fixed left-0 bottom-0 z-10 flex w-screen justify-around rounded-t-xl bg-slate-100 py-4 font-bold shadow shadow-slate-300 dark:bg-slate-700 dark:shadow-slate-900 md:static md:mb-4 md:w-full md:rounded-xl">
                    <Tabs.Trigger
                        value="active"
                        className={
                            "flex items-center justify-center transition before:relative before:mr-1 before:block before:h-2 before:w-2 before:rounded-full hover:text-sky-400 data-[state=active]:text-sky-500 data-[state=active]:before:bg-sky-500"
                        }
                    >
                        Active
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="completed"
                        className={
                            "flex items-center justify-center transition before:relative before:mr-1 before:block before:h-2 before:w-2 before:rounded-full hover:text-sky-400 data-[state=active]:text-sky-500 data-[state=active]:before:bg-sky-500"
                        }
                    >
                        Completed
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="failed"
                        className={
                            "flex items-center justify-center transition before:relative before:mr-1 before:block before:h-2 before:w-2 before:rounded-full hover:text-sky-400 data-[state=active]:text-sky-500 data-[state=active]:before:bg-sky-500"
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
