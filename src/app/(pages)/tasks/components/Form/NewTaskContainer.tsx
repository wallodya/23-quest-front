import { useNewTaskContainerClasses } from "@task/hooks";
import {
    motion,
    MotionStyle,
    MotionValue,
    useMotionTemplate,
    useMotionValue,
    useTransform,
    Variants,
} from "framer-motion";
import React, { ReactNode, useEffect } from "react";

const taskFormContainerVariants: Variants = {
    hidden: {
        opacity: 0,
        position: "fixed",
        translateY: 400,
        transition: {
            duration: 3,
        },
    },
    // visible: {
    //     opacity: 1,
    //     translateY: 0,
    //     position: "static",
    //     width: "auto",
    //     transition: {
    //         duration: 3,
    //     },
    // },
    exit: {
        opacity: 0,
        translateY: 400,
        transition: {
            duration: 3
        }
    }
};

const NewTaskContainer = ({
    children,
    isAdded,
    isShown,
}: {
    children: ReactNode;
    isAdded: boolean;
    isShown: boolean;
}) => {
    // const formStateValue = useMotionValue(100);

    // const positionValue = useTransform<string, string>(
    //     formStateValue,
    //     [100, 200, 300],
    //     ["fixed", "fixed", "static"],
    // );

    // const opacityValue = useTransform<string, number>(
    //     formStateValue,
    //     [100, 200, 300],
    //     [0, 1, 1],
    // );
    // const translateYValue = useTransform<string, number>(
    //     formStateValue,
    //     [100, 200, 300],
    //     [400, 0, 0],
    // );

    // const widthValue = useTransform<string, string>(
    //     formStateValue,
    //     [100, 200, 300],
    //     ["100vw", "100vw", "auto"],
    // );
    // const leftValue = useTransform<string, number | string>(
    //     formStateValue,
    //     [100, 200, 300],
    //     [0, 0, "auto"],
    // );
    // const bottomValue = useTransform<string, number | string>(
    //     formStateValue,
    //     [100, 200, 300],
    //     [0, 0, "auto"],
    // );

    // useEffect(() => {
    //     console.log(`isShown: ${isShown} isAdded: ${isAdded}`);
    //     !isShown && !isAdded && formStateValue.set(100);
    //     isShown && !isAdded && formStateValue.set(199);
    //     isShown && isAdded && formStateValue.set(300);
    //     console.log("formStateValue", formStateValue);
    // }, [isAdded, isShown]);
    // useEffect(() => {}, [isAdded, isShown]);

    const classes = useNewTaskContainerClasses(isAdded);
    return (
        <motion.div
            className={
                "fixed w-screen left-0 bottom-0 flex flex-col rounded-xl bg-gray-900 px-5 py-3 shadow shadow-slate-900"
            }
            key={"new-task-form-container"}
            variants={taskFormContainerVariants}
            initial={"hidden"}
            exit={"exit"}
        >
            {children}
        </motion.div>
    );
};

export default NewTaskContainer;
