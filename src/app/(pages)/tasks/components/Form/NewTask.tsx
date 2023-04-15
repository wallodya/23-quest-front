import { useTaskFormControls } from "@task/hooks";
import { Task, TaskOptimistic } from "@task/types";
import { Drawer } from "components/ui/Drawer";
import { NewTaskForm } from "@task/components/Form/NewTaskForm";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "store";
import { closeTaskForm } from "@task/features";
import * as Dialog from "@radix-ui/react-dialog";
import FileIcon from "components/icons/FileIcon";
import { useRef, useState } from "react";

const NewTask = ({
    submitTaskFn,
    isOpen: isShown,
    closeFn: closeForm,
    toggleModalFn: toggleModal,
    isInQuest=false
}: {
    submitTaskFn: (payload: TaskOptimistic) => void;
    closeFn: () => void;
    toggleModalFn: (open: boolean) => void;
    isOpen: boolean;
    isInQuest?: boolean
}) => {
    const modalPortal = useRef(null)
    return (
        <>
            <Dialog.Root open={isShown} onOpenChange={toggleModal}>
                {!isInQuest && (
                    <Dialog.Trigger asChild>
                        <button
                            role="button"
                            onClick={() => toggleModal(true)}
                            className="hidden h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-4 border-dashed border-gray-400/40 text-gray-400/40 md:flex "
                        >
                            <FileIcon size="sm" />
                            <span className="font-bold">New Task</span>
                            <div
                                className="fixed top-0 left-0 z-50 hidden md:block"
                                ref={modalPortal}
                            />
                        </button>
                    </Dialog.Trigger>
                )}
                {isInQuest && (
                    <div
                        className="fixed top-0 left-0 z-50 hidden md:block"
                        ref={modalPortal}
                    />
                )}
                <Dialog.Portal container={modalPortal.current}>
                    <Dialog.Overlay className="absolute top-0 left-0 h-screen w-screen bg-gray-900/70" />
                    <div className="absolute top-0 left-0 flex h-screen w-screen items-center justify-center">
                        <Dialog.Content
                            className="
                         rounded-xl bg-slate-700 px-2"
                        >
                            {/* <Dialog.Title>New task</Dialog.Title>
                            <Dialog.Description>
                                Create new task form
                            </Dialog.Description> */}
                            <NewTaskForm submitTaskFn={submitTaskFn} />
                            {/* <Dialog.Close /> */}
                        </Dialog.Content>
                    </div>
                </Dialog.Portal>
            </Dialog.Root>
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
        </>
    );
};

export default NewTask;
