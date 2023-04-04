import { completeTask, failTask } from "@task/features";
import { Task, TaskOptimistic, isTaskType } from "@task/types";
import { useAppDispatch } from "store";

// TODO add mutations
export const useTaskComplete = (task: Task) => {
    const dispatch = useAppDispatch()
    const handleComplete = () => {
        dispatch(completeTask(task))
    }
    return {
        handleComplete
    }
}

//TODO add mutations
export const useTaskFail = (task: Task) => {
    const dispatch=  useAppDispatch()
    const handleFail = () => {
        dispatch(failTask(task))
    }
    return {
        handleFail
    }
}

//TODO combine all task action into this hook
export const useTaskActions = (task: Task | TaskOptimistic) => {
    if (!isTaskType(task)) {
        return {
            handleComplete: () => {},
            handleFail: () => {},
        }
    }
    const { handleComplete } = useTaskComplete(task)
    const { handleFail } = useTaskFail(task)
    return {
        handleComplete,
        handleFail
    }
}