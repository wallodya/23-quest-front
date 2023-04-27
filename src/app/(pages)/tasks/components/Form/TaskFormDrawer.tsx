import FileIcon from "components/icons/FileIcon";
import { Drawer } from "components/ui/Drawer";
import { AnimatePresence } from "framer-motion";
import { useTaskForm } from "./NewTask";
import { NewTaskForm } from "./NewTaskForm";

const TaskFormDrawer = () => {
    const {
        isOpen,
        toggleModalFn,
        closeFn: closeForm,
        submitTaskFn,
        isInQuest,
    } = useTaskForm();
    return (
        <>
            {!isInQuest && (
                <button
                    role="button"
                    onClick={() => toggleModalFn(true)}
                    className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-4 border-dashed border-gray-400/40 py-2 text-gray-400/40"
                >
                    <FileIcon size="sm" />
                    <span className="font-bold">New Task</span>
                </button>
            )}
            <Drawer.Root isOpen={isOpen} drawerPosition="bottom">
                <Drawer.Content>
                    <AnimatePresence
                        onExitComplete={() => console.log("step exit complete")}
                    >
                        <NewTaskForm submitTaskFn={submitTaskFn} />
                    </AnimatePresence>
                </Drawer.Content>
                <Drawer.Background toggleFn={closeForm} />
            </Drawer.Root>
        </>
    );
}

export default TaskFormDrawer