import TasksConfig from "@task/tasks.config"
import { useSearchParams } from "next/navigation"

export const useTaskFormState = () => {
    const searchParams = useSearchParams()
    const isShown = searchParams.has(TasksConfig.form.urlParam)
    return {
        isShown
    }
}