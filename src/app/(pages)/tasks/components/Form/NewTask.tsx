import { useTaskFormControls } from "@task/hooks";
import { Task, TaskOptimistic } from "@task/types";
import { Drawer } from "components/ui/Drawer";
import { NewTaskForm } from "@task/components/Form/NewTaskForm";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "store";
import { closeTaskForm } from "@task/features";

const NewTask = ({submitTaskFn}:{submitTaskFn: (payload: TaskOptimistic) => void}) => {
    const dispatch = useAppDispatch()
    const {isOpen: isShown} = useAppSelector(state => state.tasks.taskForm)
    const closeForm = () => {
        dispatch(closeTaskForm())
    }

    return (
        <Drawer.Root isOpen={isShown} drawerPosition="bottom">
            <Drawer.Content>
                <AnimatePresence
                    onExitComplete={() => console.log("step exit complete")}
                >
                <NewTaskForm submitTaskFn={submitTaskFn}>
                    <Drawer.InnerControls toggleFn={closeForm} />
                </NewTaskForm>
                </AnimatePresence>
                    
            </Drawer.Content>
            <Drawer.Background toggleFn={closeForm} />
        </Drawer.Root>
    );
};

export default NewTask;
