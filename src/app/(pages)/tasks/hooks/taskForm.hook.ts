import { addTask } from "@task/features"
import TasksConfig from "@task/tasks.config"
import { Task, TaskType } from "@task/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useAppDispatch } from "store"

export const useTaskFormState = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const dispatch = useAppDispatch()

    const [isAdded, setIsAdded] = useState<boolean>(false)
    const isShown = searchParams.has(TasksConfig.form.urlParam)

    const closeTaskForm = () => router.replace(
        `/tasks?${TasksConfig.tabs.urlParam}=${TasksConfig.tabs.acitve.urlParamValue}`,
    );

    const moveFormToList = (payload: Task) => {
        setIsAdded(true)
        closeTaskForm()
        dispatch(addTask(payload))
    }
    return {
        isShown,
        isAdded,
        closeTaskForm,
        moveFormToList
    }
}

export const useNewTaskContainerClasses = (isAdded: boolean) => {
    if (!isAdded) {
        return "fixed bottom-0 left-0 w-screen bg-slate-200 dark:bg-slate-700";
    }

    return "flex flex-col rounded-xl bg-gray-900 px-5 py-3 shadow shadow-slate-900";
};
