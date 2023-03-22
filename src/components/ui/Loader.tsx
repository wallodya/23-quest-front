"use client"

import React, { forwardRef, LegacyRef, ReactNode } from 'react'
import { motion } from "framer-motion"

const InnerSquare = forwardRef((props, ref: LegacyRef<HTMLDivElement>) => {
  return <div ref={ref} className="h-16 w-16 bg-sky-600"></div>;
})

const OuterSquare = forwardRef(({children}: {children: ReactNode}, ref: LegacyRef<HTMLDivElement>) => {
    return (
        <div ref={ref} className="flex h-24 w-24 items-center justify-center bg-sky-500">
            {children}
        </div>
    );
})

const MotionOuterSquare = motion(OuterSquare)
const MotionInnerSquare = motion(InnerSquare)

const Loader = () => {
    return (
        <div className="flex h-full items-center justify-center">
            <motion.div
                className="flex h-24 w-24 items-center justify-center rounded-lg  bg-sky-500/50"
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 180, 270, 0],
                    opacity: [0.5, 0.3, 0.5, 0.7, 0.5],
                    borderRadius: ["10%", "10%", "50%", "30%", "50%"],
                }}
                transition={{
                    duration: 4,
                    times: [0, 0.25, 0.65, 0.85, 1],
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: ["circOut", "circIn", "linear", "easeIn"],
                }}
            >
                <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-lg  bg-sky-500/70"
                    animate={{
                        scale: [2, 1, 1, 2, 2],
                        rotate: [180, 270, 0, 0, 45],
                        opacity: [0.5, 0.7, 0.5, 0.3, 0.5],
                        borderRadius: ["50%", "45%", "10%", "15%", "10%"],
                    }}
                    transition={{
                        duration: 4,
                        times: [0, 0.25, 0.65, 0.85, 1],
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: ["circOut", "circIn", "linear", "easeIn"],
                    }}
                >
                    <motion.div
                        className="flex h-8 w-8 items-center justify-center rounded-lg  bg-sky-500/90"
                        animate={{
                            scale: [0.5, 1, 0.5, 2, 1],
                            rotate: [90, 45, 270, 180, 45],
                            borderRadius: ["30%", "10%", "50%", "30%", "10%"],
                        }}
                        transition={{
                            duration: 4,
                            times: [0, 0.25, 0.65, 0.85, 1],
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: ["circOut", "circIn", "linear", "easeIn"],
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Loader;
