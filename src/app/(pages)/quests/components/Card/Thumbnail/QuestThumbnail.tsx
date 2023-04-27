import CrossIcon from "components/icons/CrossIcon";
import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { ReactNode, useState } from "react";
import { useQuest } from "../questCard.provider";

const ThumbnailWarpper = ({ children }: { children: ReactNode }) => {
    const inlinePaddingValue = useMotionValue(30);
    const blockPaddingValue = useMotionValue(15);
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
            {children}
        </motion.div>
    );
};

const CloseButton = ({togglefn}:{togglefn: () => void}) => {
    return (
        <motion.div
            className="w-full flex justify-end"
            onClick={togglefn}
            layout
        >
            <CrossIcon size="xs" />
        </motion.div>
    );
}

const ActiveTasksCount = () => {
    const {
        stats: { activeTaskAmount },
    } = useQuest();
    return (
        <p className="text-sm font-bold italic text-emerald-700">
            {activeTaskAmount
                ? `${activeTaskAmount} tasks left`
                : activeTaskAmount === 1
                ? `1 task left`
                : "0 tasks"}
        </p>
    );
}

const TasksDonePercentage = () => {
    const {
        stats: { percentageDone },
    } = useQuest();
    return (
        <span className="flex h-16 w-full items-center justify-center rounded-full font-bold">
            <p className="relative left-[1ch]">{`${percentageDone !== null ? percentageDone : "0"}%`}</p>
        </span>
    );
}

const QuestDescription = ({
    text,
}: {
    text: string | undefined;
}) => {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded)
    }
    if (!text) {
        return null
    }
    return (
        <>
            <div
                className={`mt-2 overflow-hidden ${
                    isDescriptionExpanded ? "h-fit" : "h-0"
                } transition-all`}
            >
                <motion.p className="text-sm" layout={"position"}>
                    {text}
                </motion.p>
            </div>
            <div
                className="flex justify-center pt-2 text-sm font-bold"
                onClick={toggleDescription}
            >
                {isDescriptionExpanded ? "Show less" : "Show more"}
            </div>
        </>
    );
};

export const QuestThumbnail = ({ isOpen, toggleCard }: { isOpen: boolean, toggleCard: () => void }) => {
    const toggleOpen = () => {
        toggleCard()
    }
    const { title, description } = useQuest()

    return (
        <ThumbnailWarpper>
            {/* {isOpen && <CloseButton togglefn={toggleOpen} />} */}
            <motion.div className="grid w-full grid-cols-6 grid-rows-2" layout>
                <div className="col-1 col-span-4 row-span-2 flex flex-col justify-between gap-1">
                    <h2 className="max-w-xs font-bold">{title}</h2>
                    <ActiveTasksCount />
                </div>
                <motion.div
                    className="col-span-2 col-start-5 row-span-2 flex flex-col items-end justify-end text-xl"
                    layout
                >
                    {isOpen && <CloseButton togglefn={toggleOpen} />}
                    <TasksDonePercentage />
                </motion.div>
            </motion.div>
            {isOpen && <QuestDescription text={description} />}
        </ThumbnailWarpper>
    );
};
