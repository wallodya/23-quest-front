import { useQuestCardControls } from "@quest/common/hooks";
import { motion, useMotionValue, useScroll } from "framer-motion";
import React, { ReactNode, useEffect, useState } from "react";

const QuestCardContainer = ({ children, isOpen, toggleOpen }: { children: ReactNode, isOpen: boolean, toggleOpen: () => void }) => {
    // const { isOpen, toggleOpen } = useQuestCardControls()
    const borderRadiusValue = useMotionValue(20);
    // const { scrollY, scrollYProgress } = useScroll()
    // useEffect(() => {
    //     console.log("scroll Y: ", scrollY)
    //     console.log("scroll Y progress: ", scrollYProgress)
    // }, [scrollY, scrollYProgress])
    return (
        <li className="relative h-40 w-full ">
            <div
                className={
                    " pointer-events-none transition " +
                    (isOpen
                        ? "fixed left-0 top-0 z-30 min-h-screen w-screen bg-gray-900"
                        : "z-38 relative h-full bg-gray-900/0")
                }
            >
                <motion.div
                    className={
                        "w-full  flex flex-col bg-gray-900 pointer-events-auto overflow-hidden " +
                        (isOpen ? "h-screen" : "h-full ")
                    }
                    style={{ borderRadius: borderRadiusValue }}
                    onClick={!isOpen ? toggleOpen : () => {}}
                    initial={false}
                    layout

                    transition={{
                        duration: 0.15,
                    }}
                >{children}</motion.div>
            </div>
        </li>
    );
};

export default QuestCardContainer;
