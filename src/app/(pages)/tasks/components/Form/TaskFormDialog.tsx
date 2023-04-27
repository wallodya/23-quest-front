import * as Dialog from "@radix-ui/react-dialog";
import FileIcon from "components/icons/FileIcon";
import { useRef } from "react";
import { useTaskForm } from "./NewTask";
import { NewTaskForm } from "./NewTaskForm";

const TaskFormDialog = () => {
    const {
        isOpen,
        toggleModalFn: toggleModal,
        closeFn,
        submitTaskFn,
        isInQuest,
    } = useTaskForm();
    const modalPortal = useRef(null);
    return (
        <Dialog.Root open={isOpen} onOpenChange={toggleModal}>
            {isInQuest ? (
                <div className="fixed top-0 left-0 z-50" ref={modalPortal} />
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
                        onKeyUpCapture={(event) =>
                            event.key === " " ? event.preventDefault() : {}
                        }
                        className="h-fit rounded-xl bg-slate-700 px-2"
                    >
                        <NewTaskForm submitTaskFn={submitTaskFn} />
                    </Dialog.Content>
                </div>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default TaskFormDialog