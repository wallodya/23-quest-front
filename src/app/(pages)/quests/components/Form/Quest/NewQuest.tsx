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
        if (open) {
            dispatch(openQuestForm());
        } else {
            dispatch(closeQuestForm());
        }
    };
    const closeForm = () => {
        dispatch(closeQuestForm());
    };
    const modalPortal = useRef(null);
    const TW_MD_WIDTH = 768;
    if (typeof window === "undefined") {
        return (
            <Drawer.Root isOpen={isOpen} drawerPosition="bottom">
                <Drawer.Content>
                    <NewQuestForm />
                </Drawer.Content>
                <Drawer.Background toggleFn={closeForm} />
            </Drawer.Root>
        );
    } else if (window.innerWidth >= TW_MD_WIDTH) {
        return (
            <Dialog.Root open={isOpen} onOpenChange={toggleModal} modal>
                <Dialog.Trigger asChild>
                    <button
                        role="button"
                        onClick={() => toggleModal(true)}
                        className="hidden h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-4 border-dashed border-gray-400/40 text-gray-400/40 md:flex"
                    >
                        <PencilIcon size="sm" />
                        <span className="font-bold">New Quest</span>
                        <div
                            className="fixed top-0 left-0 z-50 hidden md:block"
                            ref={modalPortal}
                        />
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal container={modalPortal.current}>
                    <Dialog.Overlay className="absolute top-0 left-0 z-50 hidden h-screen w-screen bg-gray-900/70 md:block" />
                    <Dialog.Title>New quest</Dialog.Title>
                    <Dialog.Description>
                        Create new quest form
                    </Dialog.Description>
                    <div className="top-0 left-0 hidden h-screen w-screen items-center justify-center md:absolute md:flex">
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
    } else {
        return (
            <>
                <button
                    role="button"
                    onClick={() => toggleModal(true)}
                    className="flex py-2 h-full w-full flex-col items-center justify-center gap-2 rounded-xl border-4 border-dashed border-gray-400/40 text-gray-400/40"
                >
                    <PencilIcon size="sm" />
                    <span className="font-bold">New Quest</span>
                </button>
                <Drawer.Root isOpen={isOpen} drawerPosition="bottom">
                    <Drawer.Content>
                        <NewQuestForm />
                    </Drawer.Content>
                    <Drawer.Background toggleFn={closeForm} />
                </Drawer.Root>
            </>
        );
    }
};
