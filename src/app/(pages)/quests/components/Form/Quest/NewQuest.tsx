"use client";

import { closeQuestForm, openQuestForm } from "@quest/features";
import { NewTaskForm } from "@task/components/Form/NewTaskForm";
import { Drawer } from "components/ui/Drawer";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "store";
import NewQuestForm from "./NewQuestForm";
import * as Dialog from "@radix-ui/react-dialog";
import PencilIcon from "components/icons/PencilIcon";
import { useRef } from "react";

export const NewQuest = () => {
    const dispatch = useAppDispatch();
    const { isOpen } = useAppSelector((state) => state.quests.questForm);
    const toggleModal = (open: boolean) => {
        console.log("modal: ", open)
        if (open) {
            dispatch(openQuestForm())
        } else {
            dispatch(closeQuestForm())
        }
    }
    const closeForm = () => {
        dispatch(closeQuestForm());
    };
    const modalPortal = useRef(null)

    return (
        <>
            <Dialog.Root open={isOpen} onOpenChange={toggleModal} modal>
                <Dialog.Trigger asChild>
                    <button
                        role="button"
                        onClick={() => toggleModal(true)}
                        className="hidden md:flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-4 border-dashed border-gray-400/40 text-gray-400/40"
                    >
                        <PencilIcon size="sm" />
                        <span className="font-bold">New Quest</span>
                        <div className="z-50 fixed top-0 left-0 hidden md:block" ref={modalPortal}/>
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal container={modalPortal.current}>
                    <Dialog.Overlay className="hidden md:block absolute z-50 top-0 left-0 h-screen w-screen bg-gray-900/70" />
                    <Dialog.Title>New quest</Dialog.Title>
                    <Dialog.Description>Create new quest form</Dialog.Description>
                    <div className="hidden md:absolute top-0 left-0 h-screen w-screen md:flex justify-center items-center">
                        <Dialog.Content className="z-50 rounded-xl px-2 bg-slate-700">
                            <NewQuestForm />
                            <Dialog.Close />
                        </Dialog.Content>
                    </div>
                </Dialog.Portal>
            </Dialog.Root>
            <div className="md:hidden">
                <Drawer.Root isOpen={isOpen} drawerPosition="bottom">
                    <Drawer.Content>
                        <NewQuestForm />
                    </Drawer.Content>
                    <Drawer.Background toggleFn={closeForm} />
                </Drawer.Root>
            </div>
        </>
    );
};
