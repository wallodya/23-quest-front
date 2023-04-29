import { motion, useMotionValue } from "framer-motion";
import { ReactNode } from "react";

const QuestCardContainer = ({ children, isOpen, toggleOpen }: { children: ReactNode, isOpen: boolean, toggleOpen: () => void }) => {
    // const { isOpen, toggleOpen } = useQuestCardControls()
    const borderRadiusValue = useMotionValue(20);
    // const { scrollY, scrollYProgress } = useScroll()
    // useEffect(() => {
    //     console.log("scroll Y: ", scrollY)
    //     console.log("scroll Y progress: ", scrollYProgress)
    // }, [scrollY, scrollYProgress])
    return (
        <li className="relative h-fit w-full ">
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
                        "pointer-events-auto relative flex w-full flex-col overflow-hidden bg-gray-900 " +
                        (isOpen ? "h-screen" : "h-full")
                    }
                    style={{
                        borderRadius: borderRadiusValue,
                        // height: "-moz-available",
                        // height: "fill-available",
                    }}
                    onClick={!isOpen ? toggleOpen : () => {}}
                    initial={false}
                    layout
                    transition={{
                        duration: 0.15,
                    }}
                >
                    {children}
                </motion.div>
            </div>
        </li>
    );
};

export default QuestCardContainer;
