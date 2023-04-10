import CrossIcon from "components/icons/CrossIcon";
import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { useState } from "react";

const QuestHeader = ({ isOpen,toggleCard }: { isOpen: boolean, toggleCard: () => void }) => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    const toggleDescription = () => {
        isOpen && setIsDescriptionExpanded(!isDescriptionExpanded)
    }
    const toggleOpen = () => {
        setIsDescriptionExpanded(false)
        toggleCard()
    }
    const inlinePaddingValue = useMotionValue(30)
    const blockPaddingValue = useMotionValue(15)
    return (
        <motion.div
            className="h-fit w-full bg-emerald-500"
            style={{
                paddingTop: blockPaddingValue,
                paddingInline: inlinePaddingValue,
                paddingBottom: blockPaddingValue,
            }}
            layout
        >
            {isOpen && (
                <motion.div
                    className="mb-2 mr-[-1rem] flex justify-end"
                    onClick={toggleOpen}
                    layout
                >
                    <CrossIcon size="xs" />
                </motion.div>
            )}
            <motion.div className="grid w-full grid-cols-6 grid-rows-2" layout>
                <div className="col-1 col-span-4 row-span-2 flex flex-wrap justify-between gap-1">
                    <h2 className="max-w-xs font-bold">
                        Quest name very very long quest name bla bla
                    </h2>
                    <span className="text-sm font-bold italic text-emerald-700">
                        6 tasks left
                    </span>
                </div>
                <motion.div
                    className="col-span-2 col-start-5 row-span-2 flex items-center justify-end"
                    layout
                >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 font-bold">
                        56%
                    </div>
                </motion.div>
            </motion.div>
            {/* <p className="text-sm mt-2 row-start-3 col-span-6">Some quest description...</p> */}
            {isOpen && (
                <>
                    <div
                        className={`mt-2 overflow-hidden ${isDescriptionExpanded ? "h-fit" : "h-0"} transition-all`}
                    >
                        <motion.p className="text-sm" layout={"position"}>
                            You can also use variant modifiers to target media
                            queries like responsive breakpoints, dark mode,
                            prefers-reduced-motion, and more. For example, use
                            md:w-full to apply the w-full utility at only medium
                            screen sizes and above.
                        </motion.p>
                    </div>
                    <div
                        className="flex justify-center pt-2 text-sm font-bold"
                        onClick={toggleDescription}
                    >
                        {isDescriptionExpanded ? "Show less" : "Show more"}
                    </div>
                </>
            )}
        </motion.div>
    );
};
export default QuestHeader