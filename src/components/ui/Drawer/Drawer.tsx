import CrossIcon from "components/icons/CrossIcon";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import Button from "../Button";
import { DrawerOptions } from "./drawer.types";

const Root = ({children, isOpen} : {children: ReactNode, isOpen: boolean, options?: Required<DrawerOptions>}) => {
    const drawerDisplayClass = isOpen ? "" : "pointer-events-none";
    return (
        <div
            className={`fixed ${drawerDisplayClass} top-0 left-0 h-screen w-screen`}
        >
            <AnimatePresence onExitComplete={() => console.log("drawer off")}>
                {isOpen && <>{children}</>}
            </AnimatePresence>
        </div>
    );
}

const Content = ({children} : {children: ReactNode}) => {
    return (
        <motion.div
            key="drawer-container"
            className={`z-40 h-full w-60 bg-slate-200 dark:bg-slate-700`}
            initial={{
                translateX: -100,
            }}
            animate={{
                translateX: 0,
                transition: {
                    duration: 3,
                },
            }}
            exit={{
                translateX: -100,
                transition: {
                    duration: 3,
                },
            }}
        >
            {children}
        </motion.div>
    );
}

const Background = ({
    toggleFn,
}: {
    toggleFn: () => void;
}) => (
    <motion.div
        className={`absolute top-0 left-0 h-screen w-screen z-20 dark:bg-slate-800/70`}
        onClick={toggleFn}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 3 } }}
        exit={{
            opacity: 0
        }}
    >
    </motion.div>
);

const InnerControls = ({toggleFn} : {toggleFn: () => void}) => {
    return (
        <div className="flex w-full items-center justify-end">
            <div className="">
                <Button type="text" buttonProps={{ onClick: toggleFn }}>
                    <CrossIcon size="sm" />
                </Button>
            </div>
        </div>
    );
}

export const Drawer = {
    Root,
    Content,
    Background,
    InnerControls
}