"use client";

import FileIcon from "components/icons/FileIcon";
import ReaderIcon from "components/icons/ReaderIcon";
import useDial from "components/ui/Dial";
import { DialAction } from "components/ui/Dial/dial.types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const DIAL_ACTIONS: DialAction[] = [
    {
        tooltipText: "New task",
        isTooltipShown: true,
        Icon: () => <FileIcon size="sm" />,
        type: "link",
        href: "/new-task"
    },
    {
        tooltipText: "New quest",
        isTooltipShown: true,
        Icon: () => <ReaderIcon size="sm" />,
        type: "link",
        href: "/new-quest"
    },
];

const PAGES_WITH_DIAL = [""];

const DialMobile = ({isShown} : {isShown: boolean}) => {
    const Dial = useDial({ withActions: true, actions: DIAL_ACTIONS, dialPosition: "bottom-right" });
    // console.log("dial mobile")


    return (
        // <AnimatePresence onExitComplete={() => console.log("exit complete")}>
        //     {isShown && (
        //         <motion.div
        //             className="fixed inset-0 h-24 w-24 rounded-lg bg-red-400"
        //             key={""}
        //             initial={{
        //                 opacity: 0,
        //                 scale: 0,
        //             }}
        //             animate={{
        //                 opacity: 1,
        //                 scale: 1,
        //                 transition: {
        //                     duration: 2,
        //                 },
        //             }}
        //             exit={{
        //                 opacity: 0,
        //                 scale: 0,
        //                 transition: {
        //                     duration: 2,
        //                 },
        //             }}
        //         ></motion.div>
        //     )}

        // </AnimatePresence>
        <Dial />
    );
};

export default DialMobile;
