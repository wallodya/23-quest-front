"use client"

import FileIcon from "components/icons/FileIcon";
import PencilIcon from "components/icons/PencilIcon";
import ReaderIcon from "components/icons/ReaderIcon";
import React, { forwardRef, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip"
import withUnbreakableSpaces from "common/utils/withUnbreakableSpaces";

const actions = [
    {
        name: "New task",
        // Icon: forwardRef((props, ref) => <FileIcon size="sm"/>)
        Icon: () => <FileIcon size="sm" />,
    },
    {
        name: "New quest",
        // Icon: forwardRef((props, ref) => <ReaderIcon size="sm"/>)
        Icon: () => <ReaderIcon size="sm" />,
    },
];

const PAGES_WITH_DIAL = [""]

const DialActions = ({ isOpen, handleClose }: { isOpen: boolean, handleClose: () => void }) => {
    if (!isOpen) return null
    return (
        <>
            <div className="fixed top-0 left-0 h-screen w-screen bg-gradient-to-t from-slate-800" onClick={handleClose}></div>
            <ul className="mb-4 flex flex-col items-center gap-4">
                {actions.map(({ name, Icon }, index) => (
                    <li
                        key={index}
                        className="relative flex items-center justify-between gap-4 z-40"
                    >
                        <div className="absolute right-14 rounded-lg bg-sky-300 px-3 py-1 text-sm text-sky-600 shadow-lg shadow-slate-300 dark:bg-sky-100 dark:text-sky-600 dark:shadow-slate-900">
                            {withUnbreakableSpaces(name)}
                        </div>
                        <div className="rounded-full bg-sky-600 p-2 text-sky-300 shadow-lg shadow-slate-300 transition hover:bg-sky-700 dark:bg-sky-400 dark:text-sky-100 dark:shadow-slate-900 dark:hover:bg-sky-500">
                            <Icon />
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};
const useDialControls = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleDial = () => setIsOpen(!isOpen)
    const closeDial = () => setIsOpen(false)
    return {
        toggleDial,
        closeDial,
        isOpen
    }
}

const DialMobile = () => {
    const {toggleDial, closeDial, isOpen: isDialOpen} = useDialControls()
        return (  
            <div className="fixed right-8 bottom-8">
                <DialActions isOpen={isDialOpen} handleClose={closeDial}/>
                <div
                    className="relative rounded-full w-fit p-4 z-40 text-sky-300 shadow-lg shadow-slate-300 transition bg-sky-600 hover:bg-sky-700 dark:bg-sky-400 dark:text-sky-100 dark:shadow-slate-900 dark:hover:bg-sky-500"
                    onClick={toggleDial}
                >
                    <PencilIcon size="md" />
                </div>
            </div>
        );
        }

export default DialMobile;
