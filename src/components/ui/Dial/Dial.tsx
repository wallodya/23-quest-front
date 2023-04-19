"use client"

import { withUnbreakableSpaces } from "common/utils";
import PencilIcon from "components/icons/PencilIcon";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useDialActionsPositionClasses, useDialControls, useDialPosotionClasses, useTooltipPositionClasses, useVoidGradientClasses } from "./dial.hooks";
import { DialAction, DialOptions, DialPositions } from "./dial.types";

const TRANSITION_DURATION = 0.4
const TRANSITION_EXIT_DURATION = 0.3

const Background = ({
    handleClose: closeDial,
    dialPosition,
}: {
    handleClose: () => void;
    dialPosition: DialPositions;
}) => {
    const gradientClasses = useVoidGradientClasses(dialPosition);
    return (
        <motion.div
            className={`fixed top-0 left-0 h-screen w-screen ${gradientClasses}`}
            onClick={closeDial}
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: TRANSITION_DURATION,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: TRANSITION_EXIT_DURATION,
                },
            }}
        ></motion.div>
    );
};

const Action = ({
    Icon,
    tooltipText,
    closeOnPush,
    isTooltipShown,
    type,
    href,
    action,
    handleClose,
    dialPosition,
}: DialAction & { handleClose: () => void; dialPosition: DialPositions }) => {
    const handleClick = () => {
        if (action) {
            action();
        }
        if (closeOnPush) {
            handleClose();
        }
    };
    const positionClasses = useTooltipPositionClasses(dialPosition);

    return (
        <li
            className="relative z-40 flex items-center justify-between gap-4"
            onClick={handleClick}
        >
            {isTooltipShown && (
                <motion.div
                    className={`absolute ${positionClasses} rounded-lg bg-sky-300 px-3 py-1 text-sm text-sky-600 shadow-lg shadow-slate-300 dark:bg-sky-100 dark:text-sky-600 dark:shadow-slate-900`}
                    key="dial-action-tooltip"
                    initial={{
                        rotate: -90,
                        translateY: 80,
                        translateX: 25,
                    }}
                    animate={{
                        rotate: [null, 0, 8, 0],
                        translateY: [null, 0, -10, 0],
                        translateX: [null, 0, 2, 0],
                        transition: {
                            times: [0, 0.2, 0.5, 1],
                            duration: TRANSITION_DURATION,
                            easings: ["easeIn", "easeOut", "easeIn"],
                        },
                    }}
                    exit={{
                        rotate: -90,
                        translateY: 80,
                        translateX: 25,
                        transition: {
                            duration: TRANSITION_EXIT_DURATION,
                        },
                    }}
                >
                    {withUnbreakableSpaces(tooltipText)}
                </motion.div>
            )}
            {type === "link" ? (
                <Link
                    href={href ?? ""}
                    className="rounded-full bg-sky-600 p-2 text-sky-300 shadow-lg shadow-slate-300 transition hover:bg-sky-700 dark:bg-sky-400 dark:text-sky-100 dark:shadow-slate-900 dark:hover:bg-sky-500"
                >
                    <Icon />
                </Link>
            ) : (
                <div className="rounded-full bg-sky-600 p-2 text-sky-300 shadow-lg shadow-slate-300 transition hover:bg-sky-700 dark:bg-sky-400 dark:text-sky-100 dark:shadow-slate-900 dark:hover:bg-sky-500">
                    <Icon />
                </div>
            )}
        </li>
    );
};

export const SpeedDial = ({
    options: {dialPosition, actions, withActions},
}: {
    options: Required<DialOptions>;
}) => {
    const {toggleDial, isOpen, closeDial} = useDialControls()

    const dialPositionClasses = useDialPosotionClasses(dialPosition);
    const actionsPositionClasses = useDialActionsPositionClasses(dialPosition);
    const isActionsOnTop = dialPosition === "bottom-left" || dialPosition === "bottom-right"

    return (
        <div className={`${dialPositionClasses} z-[12]`}>
            {isActionsOnTop && (
                <AnimatePresence>
                    {isOpen && withActions && (
                        <motion.ul
                            className={`relative z-10 flex ${actionsPositionClasses} flex-col items-center gap-4`}
                            key="dial-actions"
                            initial={{
                                opacity: 0,
                                translateY: 60,
                                translateX: -33,
                                rotate: -45
                            }}
                            animate={{
                                opacity: [null, 1, 1, 1],
                                translateY: [null, 0, 0, 0],
                                translateX: [null, 0, 8, 0],
                                rotate: [null, 0, 6, 0],
                                transition: {
                                    times: [0, 0.2, 0.5, 1],
                                    duration: TRANSITION_DURATION,
                                    easings: ["easeIn", "easeOut", "easeIn"]
                                }
                            }}
                            exit={{
                                opacity: 0,
                                translateY: 60,
                                translateX: -33,
                                rotate: -45,
                                transition: {
                                    duration: TRANSITION_EXIT_DURATION
                                }
                            }}
                        >
                            {actions.map((actionProps, index) => (
                                <Action {...actionProps} key={index} dialPosition={dialPosition} handleClose={closeDial}/>
                            ))}
                        </motion.ul>
                    )}
                    {isOpen && (
                        <Background
                            handleClose={closeDial}
                            dialPosition={dialPosition}
                        />
                    )}
                </AnimatePresence>
            )}

            <motion.div
                className="relative z-10 w-fit rounded-full bg-sky-600 p-4 text-sky-300 shadow-lg shadow-slate-300 transition hover:bg-sky-700 dark:bg-sky-400 dark:text-sky-100 dark:shadow-slate-900 dark:hover:bg-sky-500"
                onClick={toggleDial}
                key="dial-trigger"
                initial={{ scale: 0 }}
                animate={{
                    // scale: [null, 0.5, 1],
                    scale: 1,
                    rotate: [0, 45, 0],
                    transition: {
                        duration: TRANSITION_DURATION,
                        times: [0, 0.2, 0.5, 1],
                        easings: ["easeIn", "easeOut", "easeIn"]
                    }
                }}
                whileTap={{                    
                    scale: [null, 0.3, 0.9],
                    transition: {
                        duration: TRANSITION_EXIT_DURATION,
                        times: [0, 0.1, 1],
                        easings: ["easeOut", "easeIn"]
                    }
                }}
            >
                <PencilIcon size="md" />
            </motion.div>

            {!isActionsOnTop && (
                <></>
            )}
        </div>
    );
};

