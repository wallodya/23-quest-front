import { useTaskFormControls } from "@task/hooks";
import { Task, TaskOptimistic } from "@task/types";
import { Drawer } from "components/ui/Drawer";
import { NewTaskForm } from "@task/components/Form/NewTaskForm";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "store";
import { closeTaskForm } from "@task/features";
import * as Dialog from "@radix-ui/react-dialog";
import FileIcon from "components/icons/FileIcon";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
    useSyncExternalStore,
} from "react";

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

    if (typeof window === undefined) {
        return (
            <div className="md:hidden">
                <Drawer.Root isOpen={isShown} drawerPosition="bottom">
                    <Drawer.Content>
                        <AnimatePresence
                            onExitComplete={() =>
                                console.log("step exit complete")
                            }
                        >
                            <NewTaskForm submitTaskFn={submitTaskFn} />
                            {/* <Drawer.InnerControls toggleFn={closeForm} /> */}
                        </AnimatePresence>
                    </Drawer.Content>
                    <Drawer.Background toggleFn={closeForm} />
                </Drawer.Root>
            </div>
        );
    } else if (window.innerWidth >= TW_MD_WIDTH) {
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
                            // onKeyDown={(event) => (event.key === " " ? event.stopPropagation() : {})}
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
            <Drawer.Root isOpen={isShown} drawerPosition="bottom">
                <Drawer.Content>
                    <AnimatePresence
                        onExitComplete={() => console.log("step exit complete")}
                    >
                        <NewTaskForm submitTaskFn={submitTaskFn} />
                        {/* <Drawer.InnerControls toggleFn={closeForm} /> */}
                    </AnimatePresence>
                </Drawer.Content>
                <Drawer.Background toggleFn={closeForm} />
            </Drawer.Root>
        );
    }
};

export default NewTask;
