"use client"

import withUnbreakableSpaces from "common/utils/withUnbreakableSpaces";
import PencilIcon from "components/icons/PencilIcon";
import Link from "next/link";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { DialAction, DialOptions } from "./dial.types";
import DialProvider, { useDialContext } from "./DialProvider";

const Void = () => {
    const {
        controls: { closeDial },
    } = useDialContext();
    return (
        <div
            className="fixed top-0 left-0 h-screen w-screen bg-gradient-to-t from-slate-800"
            onClick={closeDial}
        ></div>
    );
};

const Action = ({Icon, tooltipText, closeOnPush, isTooltipShown, type, href, action}: DialAction) => {
    const {
        controls: { closeDial },
    } = useDialContext();

    const handleClick = () => {
        if (type === "handler" && action) {
            action()
        }
        if (closeOnPush) {
            closeDial()
        }
    }

    return (
        <li
            className="relative z-40 flex items-center justify-between gap-4"
            onClick={handleClick}
        >
            {isTooltipShown && (
                <div className="absolute right-14 rounded-lg bg-sky-300 px-3 py-1 text-sm text-sky-600 shadow-lg shadow-slate-300 dark:bg-sky-100 dark:text-sky-600 dark:shadow-slate-900">
                    {withUnbreakableSpaces(tooltipText)}
                </div>
            )}
            {
                type === "link" ?
                <Link href={href ?? ""} className="rounded-full bg-sky-600 p-2 text-sky-300 shadow-lg shadow-slate-300 transition hover:bg-sky-700 dark:bg-sky-400 dark:text-sky-100 dark:shadow-slate-900 dark:hover:bg-sky-500">
                    <Icon />
                </Link>
                :
                <div className="rounded-full bg-sky-600 p-2 text-sky-300 shadow-lg shadow-slate-300 transition hover:bg-sky-700 dark:bg-sky-400 dark:text-sky-100 dark:shadow-slate-900 dark:hover:bg-sky-500">
                    <Icon />
                </div>
            }
        </li>
    );
}

const DialActions = () => {
    const {
        controls: { isOpen },
        options: { actions },
    } = useDialContext();
    if (!isOpen) return null
    return (
        <>
            <Void />
            <ul className="mb-4 flex flex-col items-center gap-4">
                {actions.map((actionProps, index) => (
                    <Action {...actionProps} key={index}/>
                ))}
            </ul>
        </>
    );
};

const SpeedDial = () => {
    const {
        controls: { toggleDial },
    } = useDialContext();
    return (
        <>
            <div className="fixed right-8 bottom-8">
                <DialActions/>
                <div
                    className="relative z-40 w-fit rounded-full bg-sky-600 p-4 text-sky-300 shadow-lg shadow-slate-300 transition hover:bg-sky-700 dark:bg-sky-400 dark:text-sky-100 dark:shadow-slate-900 dark:hover:bg-sky-500"
                    onClick={toggleDial}
                >
                    <PencilIcon size="md" />
                </div>
            </div>
        </>
    );
};

const useDialControls = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleDial = () => setIsOpen(!isOpen);
    const closeDial = () => setIsOpen(false);
    return {
        toggleDial,
        closeDial,
        isOpen,
    };
};

export const useDial = (options?: DialOptions) => {
    const isAnimated = options?.isAnimated ?? true
    const isStyled = options?.isStyled ?? true
    const dialPosition = options?.dialPosition ?? "bottom-right"
    const pages = options?.pages || null
    const Icon = options?.Icon ?? (() => <PencilIcon size="md" />)
    const withActions = options?.withActions ?? false
    const actions = options?.actions ?? []
    const handler = options?.handler ?? (() => {})
    const dialOptions = {
        isAnimated,
        isStyled,
        dialPosition,
        pages,
        Icon,
        withActions,
        actions,
        handler
    }
    
    const dialControls = useDialControls()

    const Dial = () => (
        <DialProvider options={dialOptions} controls={dialControls}>
            <SpeedDial />
        </DialProvider>
    );

    return { Dial, dialControls };
}
