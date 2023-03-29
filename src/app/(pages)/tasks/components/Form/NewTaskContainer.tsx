import { useNewTaskContainerClasses } from "@task/hooks";
import { motion, MotionStyle, useMotionTemplate, useMotionValue, useTransform, Variants } from "framer-motion";
import React, { ReactNode, useEffect } from "react";

const taskFormContainerVariants: Variants = {
    initial: (isAdded: boolean) => (
        isAdded  
        ? {
            opacity: 1,
            translateY: 0,
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100vw",
            transition: {
                duration: 3,
            },
        }
        : {
            opacity: 0,
            position: "fixed",
            translateY: 500,
            transition: {
                duration: 3,
            },
        }
    ),
    visible: (isAdded: boolean) =>
        isAdded
            ? {
                  opacity: 1,
                  translateY: 0,
                  position: "static",
                  width: "auto",
                  transition: {
                      duration: 3,
                  },
              }
            : {
                  opacity: 1,
                  translateY: 0,
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  width: "100vw",
                  transition: {
                      duration: 3,
                  },
              },
};

const NewTaskContainer = ({
    children,
    isAdded,
    isShown
}: {
    children: ReactNode;
    isAdded: boolean;
    isShown: boolean
}) => {
    const formStateValue = useMotionValue(100)
    
    const positionValue = useTransform<string, string>(formStateValue, [101, 201, 300], ["fixed", "fixed", "static"])

    const opacityValue = useTransform<string, number>(formStateValue, [101, 201, 300], [0, 1, 1])
    const translateYValue = useTransform<string, number>(formStateValue, [101, 201, 300], [400, 0, 0])

    const widthValue = useTransform<string, string>(formStateValue, [101, 201, 300], ["100vw", "100vw", "auto"])
    const leftValue = useTransform<string, number | string>(formStateValue, [101, 201, 300], [0, 0, "auto"])
    const bottomValue = useTransform<string, number | string>(formStateValue, [101, 201, 300], [0, 0, "auto"])

    useEffect(() => {
        console.log(`isShown: ${isShown} isAdded: ${isAdded}`)
        !isShown && formStateValue.set(100)
        isShown && !isAdded && formStateValue.set(200)
        isShown && isAdded && formStateValue.set(300)
        console.log('formStateValue', formStateValue)
    }, [isAdded, isShown])

    const classes = useNewTaskContainerClasses(isAdded);
    return (
        <motion.div
            className={
                "flex flex-col rounded-xl bg-gray-900 px-5 py-3 shadow shadow-slate-900"
            }
            key={"new-task-form-container"}

            style={{
                position: positionValue,
                width: widthValue,
                bottom: bottomValue,
                left: leftValue,
                opacity: opacityValue,
                translateY: translateYValue,
            }}
            initial={"initial"}
            animate={"visible"}
            exit={{
                opacity: 0,
                translateY: 600,
                transition: {
                    duration: 5,
                },
            }}
        >
            {children}
        </motion.div>
    );
};

export default NewTaskContainer;
