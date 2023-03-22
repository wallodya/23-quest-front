import { AnimatePresence } from "framer-motion";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { DialOptions, DialControls } from "./dial.types";

const initialContext: {
    options: Required<DialOptions>,
    controls: DialControls    
} = {
    options: {
        isAnimated: true,
        isStyled: true,
        dialPosition: "bottom-right",
        pages:  null,
        withActions: false,
        handler: () => {},
        Icon: () => <></>,
        actions: []
    },
    controls: {
        toggleDial: () => {},
        closeDial: () => {},
        isOpen: false,
    }
}
const DialContext = createContext(initialContext);
export const useDialContext = () => useContext(DialContext)

const DialProvider = ({ children, options, controls }: { children: ReactNode, options: Required<DialOptions>, controls: DialControls }) => {
    
    // const DialWithProvider = useMemo(
    //     () => {
    //     console.log("dial provider")
    //     return (
    //             <DialContext.Provider value={{ controls, options }}>
    //                 {children}
    //             </DialContext.Provider>
    //         )
    //     },
    //     []
    // );
    // return DialWithProvider
    // return (
    //     <DialContext.Provider value={{ controls, options }}>
    //             {children}
    //     </DialContext.Provider>
    // );
    return 
};

export default DialProvider