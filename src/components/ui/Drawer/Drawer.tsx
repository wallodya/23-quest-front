import CrossIcon from "components/icons/CrossIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useIsIncludedOnPage } from "common/hooks"
import { createContext, ReactNode, useContext } from "react";

import {
    getDrawerOptions,
    useDrawerBackgroundAnimation,
    useDrawerBackgroundGradientClasses,
    useDrawerContentAnimation,
    useDrawerContentPositionClasses,
    useDrawerPositionClasses,
} from "./drawer.hooks";
import { DrawerOptions } from "./drawer.types";

const ANIMATION_DURATION = 0.3
const ANIMATION_EXIT_DURATION = 0.2

const initialContext: Required<DrawerOptions> = {
    isAnimated: true,
    isStyled: true,
    drawerPosition: "left",
    pages: null,
    excludePages: null,
}
const DrawerContext = createContext(initialContext);
const useDrawerOptions = () => useContext(DrawerContext)

const Root = ({children, isOpen, ...options} : {children: ReactNode, isOpen: boolean} & DrawerOptions) => {
    const drawerOptions = getDrawerOptions(options)
    const drawerDisplayClass = isOpen ? "" : "pointer-events-none";
    
    const isIncludedOnPage = useIsIncludedOnPage(drawerOptions.pages, drawerOptions.excludePages)
    if (!isIncludedOnPage) {
        return null
    }

    const drawerPositionClasses = useDrawerPositionClasses(drawerOptions.drawerPosition)
    return (
        <DrawerContext.Provider value={drawerOptions}>
            <div
                className={`fixed ${drawerDisplayClass} top-0 left-0 ${drawerPositionClasses} h-screen w-screen`}
            >
                <AnimatePresence>
                    {isOpen && <>{children}</>}
                </AnimatePresence>
            </div>
        </DrawerContext.Provider>
    );
}

const Content = ({children} : {children: ReactNode}) => {
    const { drawerPosition } = useDrawerOptions()
    const drawerContentPositionClasses = useDrawerContentPositionClasses(drawerPosition)
    const {initial, animate, exit}= useDrawerContentAnimation(drawerPosition)
    return (
        <motion.div
            key="drawer-container"
            className={`z-40 ${drawerContentPositionClasses} bg-slate-200 dark:bg-slate-700`}
            initial={initial}
            animate={animate}
            exit={exit}
        >
            {children}
        </motion.div>
    );
}

const Background = ({ toggleFn }: { toggleFn: () => void }) => {
    const { drawerPosition } = useDrawerOptions();
    const backgroundGradientClasses = useDrawerBackgroundGradientClasses(drawerPosition)
    const { initial, animate, exit } =
        useDrawerBackgroundAnimation(drawerPosition);
    return (
        <motion.div
            className={`absolute top-0 left-0 z-20 h-screen w-screen ${backgroundGradientClasses}`}
            onClick={toggleFn}
            initial={initial}
            animate={animate}
            exit={exit}
        ></motion.div>
    );
}

const InnerControls = ({toggleFn} : {toggleFn: () => void}) => {
    return (
        <div className="mb-2 flex w-full items-center justify-between py-1 font-bold text-slate-600 dark:text-slate-500">
                <span className="text-xs">v0.1.0</span>
                <button className="" onClick={toggleFn}>
                    <CrossIcon size="xs" /> 
                </button>
        </div>
    );
}

export const Drawer = {
    Root,
    Content,
    Background,
    InnerControls
}