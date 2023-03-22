"use client"

import withUnbreakableSpaces from "common/utils/withUnbreakableSpaces";
import PencilIcon from "components/icons/PencilIcon";
import Link from "next/link";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useDialActionsPositionClasses, useDialPosotionClasses, useTooltipPositionClasses, useVoidGradientClasses } from "./dial.hooks";
import { DialAction, DialOptions, DialPositions } from "./dial.types";
import DialProvider, { useDialContext } from "./DialProvider";



const Void = () => {
    const {
        controls: { closeDial },
        options: { dialPosition },
    } = useDialContext();

    const gradientClasses = useVoidGradientClasses(dialPosition)
    return (
        <div
            className={`fixed top-0 left-0 h-screen w-screen ${gradientClasses}`}
            onClick={closeDial}
        ></div>
    );
};

const Action = ({Icon, tooltipText, closeOnPush, isTooltipShown, type, href, action}: DialAction) => {
    const {
        controls: { closeDial },
        options: { dialPosition },
    } = useDialContext();

    const handleClick = () => {
        if (type === "handler" && action) {
            action()
        }
        if (closeOnPush) {
            closeDial()
        }
    } 

    const positionClasses = useTooltipPositionClasses(dialPosition)

    return (
        <li
            className="relative z-40 flex items-center justify-between gap-4"
            onClick={handleClick}
        >
            {isTooltipShown && (
                <div className={`absolute ${positionClasses} rounded-lg bg-sky-300 px-3 py-1 text-sm text-sky-600 shadow-lg shadow-slate-300 dark:bg-sky-100 dark:text-sky-600 dark:shadow-slate-900`}>
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
        options: { actions, dialPosition },
    } = useDialContext();
    if (!isOpen) return null

    const positionClasses = useDialActionsPositionClasses(dialPosition)
    return (
        <>
            <Void />
            <ul className={`flex ${positionClasses} flex-col items-center gap-4`}>
                {actions.map((actionProps, index) => (
                    <Action {...actionProps} key={index}/>
                ))}
            </ul>
        </>
    );
};

export const SpeedDial = () => {
    const {
        controls: { toggleDial },
        options: { dialPosition }
    } = useDialContext();
    
    const positionClasses = useDialPosotionClasses(dialPosition)

    return (
        <>
            <div className={positionClasses}>
                {(dialPosition === "bottom-left" ||
                    dialPosition === "bottom-right") && <DialActions />}
                <div
                    className="relative z-40 w-fit rounded-full bg-sky-600 p-4 text-sky-300 shadow-lg shadow-slate-300 transition hover:bg-sky-700 dark:bg-sky-400 dark:text-sky-100 dark:shadow-slate-900 dark:hover:bg-sky-500"
                    onClick={toggleDial}
                >
                    <PencilIcon size="md" />
                </div>
                {(dialPosition === "top-left" ||
                    dialPosition === "top-right") && <DialActions />}
            </div>
        </>
    );
};

