"use client"

import React, { createContext, ReactNode, useContext, useState } from "react";
import { DialOptions } from "./dial.types";
import DialProvider from "./DialProvider";

const Void = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <div
            className="fixed top-0 left-0 h-screen w-screen bg-gradient-to-t from-slate-800"
            onClick={handleClose}
        ></div>
    );
};

const SpeedDial = () => {
    return (
        // <div className="fixed right-8 bottom-8">
        //     <DialActions isOpen={isDialOpen} handleClose={closeDial} />
        //     <div
        //         className="relative z-40 w-fit rounded-full bg-sky-600 p-4 text-sky-300 shadow-lg shadow-slate-300 transition hover:bg-sky-700 dark:bg-sky-400 dark:text-sky-100 dark:shadow-slate-900 dark:hover:bg-sky-500"
        //         onClick={toggleDial}
        //     >
        //         <PencilIcon size="md" />
        //     </div>
        // </div>
        <></>
    );
};

const useDial = (dialId: string, options?: DialOptions) => {
    const isAnimated = options?.isAnimated ?? true
    const isStyled = options?.isStyled ?? true
    const dialPosition = options?.dialPosition ?? "bottom-right"
    const pages = options?.pages || null
    const dialOptions = {
        isAnimated,
        isStyled,
        dialPosition,
        pages
    }

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleDial = () => setIsOpen(!isOpen)
    const closeDial = () => setIsOpen(false)
    
    const dialControls = {
        toggleDial,
        closeDial,
        isOpen
    }
    const Dial = () => (
        <DialProvider options={dialOptions} controls={dialControls}>
            <SpeedDial />
        </DialProvider>
    );

    return [Dial, dialControls]
}

export default useDial;
