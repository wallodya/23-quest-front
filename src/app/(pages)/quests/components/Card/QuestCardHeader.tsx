import CrossIcon from "components/icons/CrossIcon";
import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { useState } from "react";
import { useQuest } from "./questCard.provider";

const QuestHeader = ({ isOpen,toggleCard }: { isOpen: boolean, toggleCard: () => void }) => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    const toggleDescription = () => {
        isOpen && setIsDescriptionExpanded(!isDescriptionExpanded)
    }
    const toggleOpen = () => {
        setIsDescriptionExpanded(false)
        toggleCard()
    }
    const { title, description, stats: { activeTaskAmount, percentageDone } } = useQuest()
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
                <div className="col-1 col-span-4 row-span-2 flex flex-col justify-between gap-1">
                    <h2 className="max-w-xs font-bold">{title}</h2>
                    <span className="text-sm font-bold italic text-emerald-700">
                        {activeTaskAmount
                            ? `${activeTaskAmount} tasks left`
                            : activeTaskAmount === 1
                            ? `1 task left`
                            : "0 tasks"}
                    </span>
                </div>
                <motion.div
                    className="col-span-2 col-start-5 row-span-2 flex items-center justify-end text-xl"
                    layout
                >
                    {/* <div className="flex h-16 w-16 items-center justify-center rounded-full border-8 font-bold"> */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full font-bold">
                        {`${percentageDone !== null ? percentageDone : "0"}%`}
                    </div>
                </motion.div>
            </motion.div>
            {/* <p className="text-sm mt-2 row-start-3 col-span-6">Some quest description...</p> */}
            {isOpen && description && (
                <>
                    <div
                        className={`mt-2 overflow-hidden ${
                            isDescriptionExpanded ? "h-fit" : "h-0"
                        } transition-all`}
                    >
                        <motion.p className="text-sm" layout={"position"}>
                            {description}
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