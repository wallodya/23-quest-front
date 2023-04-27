import { openQuestForm, closeQuestForm } from "@quest/features";
import * as Dialog from "@radix-ui/react-dialog";
import PencilIcon from "components/icons/PencilIcon";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "store";
import NewQuestForm from "./NewQuestForm";

export const QuestFormDialog = () => {
    const dispatch = useAppDispatch();
    const { isOpen } = useAppSelector((state) => state.quests.questForm);
    const toggleModal = (open: boolean) => {
        if (open) {
            dispatch(openQuestForm());
        } else {
            dispatch(closeQuestForm());
        }
    };
    const modalPortal = useRef(null);
    return (
        <Dialog.Root open={isOpen} onOpenChange={toggleModal} modal>
            <Dialog.Trigger asChild>
                <button
                    role="button"
                    onClick={() => toggleModal(true)}
                    className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-4 border-dashed border-gray-400/40 text-gray-400/40"
                >
                    <PencilIcon size="sm" />
                    <span className="font-bold">New Quest</span>
                    <div
                        className="fixed top-0 left-0 z-50"
                        ref={modalPortal}
                    />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal container={modalPortal.current}>
                <Dialog.Overlay className="absolute top-0 left-0 z-50 h-screen w-screen bg-gray-900/70" />
                <Dialog.Title>New quest</Dialog.Title>
                <Dialog.Description>Create new quest form</Dialog.Description>
                <div className="top-0 left-0 flex h-screen w-screen items-center justify-center md:absolute">
                    <Dialog.Content
                        className="z-50 rounded-xl bg-slate-700 px-2"
                        onKeyUpCapture={(event) =>
                            event.key === " " ? event.preventDefault() : {}
                        }
                    >
                        <NewQuestForm />
                        <Dialog.Close />
                    </Dialog.Content>
                </div>
            </Dialog.Portal>
        </Dialog.Root>
    );
}