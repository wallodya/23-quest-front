"use client"

import { TaskOptimistic } from "@task/types";
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import TaskFormDialog from "./TaskFormDialog";
import TaskFormDrawer from "./TaskFormDrawer";
import { SubmitHandler } from "react-hook-form";
import { CreateTaskSchemaT } from "./createTask.schema";
import { useMobileScreenSize } from "common/hooks";

type TaskFormContextType = {
    submitTaskFn: SubmitHandler<CreateTaskSchemaT>;
    closeFn: () => void;
    toggleModalFn: (open: boolean) => void;
    isOpen: boolean;
    isInQuest?: boolean;
}
const TaskFormContext = createContext<TaskFormContextType>({
    submitTaskFn: () => {},
    closeFn: () => {},
    toggleModalFn: () => {},
    isOpen: false
})
export const useTaskForm = () => useContext(TaskFormContext)

const NewTask = (contextProps: TaskFormContextType) => {
    // const [isDialog, setIsDialog] = useState<boolean>(false)
    // const TW_MD_WIDTH = 768;
    // useEffect(() => {
    //     if (typeof window !== "undefined" && window.innerWidth >= TW_MD_WIDTH) {
    //         setIsDialog(true)
    //     }
    // })
    const isDrawer = useMobileScreenSize()

    return (
        <TaskFormContext.Provider value={contextProps}>
            {isDrawer ? <TaskFormDrawer /> : <TaskFormDialog />}
        </TaskFormContext.Provider>
    );
};

export default NewTask;
