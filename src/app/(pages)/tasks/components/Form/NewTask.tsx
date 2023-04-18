import * as Dialog from "@radix-ui/react-dialog";
import { NewTaskForm } from "@task/components/Form/NewTaskForm";
import { TaskOptimistic } from "@task/types";
import FileIcon from "components/icons/FileIcon";
import { Drawer } from "components/ui/Drawer";
import { AnimatePresence } from "framer-motion";
import {
    useRef
} from "react";

const IS_BROWSER = typeof window === "object" && "[object Window]" === window.toString.call(window);

//TODO encapsulate drawer and dialog in separate components
const NewTask = ({
    submitTaskFn,
    isOpen: isShown,
    closeFn: closeForm,
    toggleModalFn: toggleModal,
    isInQuest = false,
}: {
    submitTaskFn: (payload: TaskOptimistic) => void;
    closeFn: () => void;
    toggleModalFn: (open: boolean) => void;
    isOpen: boolean;
    isInQuest?: boolean;
}) => {
    const modalPortal = useRef(null);
    const TW_MD_WIDTH = 768;

    if (!IS_BROWSER) {
        return (
            <Drawer.Root isOpen={isShown} drawerPosition="bottom">
                <Drawer.Content>
                    <AnimatePresence
                        onExitComplete={() => console.log("step exit complete")}
                    >
                        <NewTaskForm submitTaskFn={submitTaskFn} />
                    </AnimatePresence>
                </Drawer.Content>
                <Drawer.Background toggleFn={closeForm} />
            </Drawer.Root>
        );
    } else if (IS_BROWSER && window.innerWidth >= TW_MD_WIDTH) {
        return (
            <Dialog.Root open={isShown} onOpenChange={toggleModal}>
                {isInQuest ? (
                    <div
                        className="fixed top-0 left-0 z-50"
                        ref={modalPortal}
                    />
                ) : (
                    <Dialog.Trigger asChild>
                        <button
                            role="button"
                            onClick={() => toggleModal(true)}
                            className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-4 border-dashed border-gray-400/40 text-gray-400/40"
                        >
                            <FileIcon size="sm" />
                            <span className="font-bold">New Task</span>
                            <div
                                className="fixed top-0 left-0 z-50"
                                ref={modalPortal}
                            />
                        </button>
                    </Dialog.Trigger>
                )}
                <Dialog.Portal container={modalPortal.current}>
                    <Dialog.Overlay className="absolute top-0 left-0 h-screen w-screen bg-gray-900/70" />
                    <div className="absolute top-0 left-0 flex h-screen w-screen items-center justify-center">
                        <Dialog.Content
                            onKeyUpCapture={(event) => event.key === " " ? event.preventDefault() : {}}
                            className="rounded-xl bg-slate-700 px-2"
                        >
                            <NewTaskForm submitTaskFn={submitTaskFn} />
                        </Dialog.Content>
                    </div>
                </Dialog.Portal>
            </Dialog.Root>
        );
    } else {
        return (
            <>
                {!isInQuest && (
                    <button
                        role="button"
                        onClick={() => toggleModal(true)}
                        className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-4 border-dashed border-gray-400/40 py-2 text-gray-400/40"
                    >
                        <FileIcon size="sm" />
                        <span className="font-bold">New Task</span>
                    </button>
                )}
                <Drawer.Root isOpen={isShown} drawerPosition="bottom">
                    <Drawer.Content>
                        <AnimatePresence
                            onExitComplete={() =>
                                console.log("step exit complete")
                            }
                        >
                            <NewTaskForm submitTaskFn={submitTaskFn} />
                        </AnimatePresence>
                    </Drawer.Content>
                    <Drawer.Background toggleFn={closeForm} />
                </Drawer.Root>
            </>
        );
    }
};

export default NewTask;
