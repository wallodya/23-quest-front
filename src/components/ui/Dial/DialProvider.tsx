import { createContext, ReactNode, useContext } from "react";
import { DialOptions, DialControls } from "./dial.types";

const DialContext = createContext({ options: {}, controls: {}});
export const useDialContext = () => useContext(DialContext)

const DialProvider = ({ children, options, controls }: { children: ReactNode, options: Required<DialOptions>, controls: DialControls }) => {
    return (
        <DialContext.Provider value={{ controls, options }}>
            {children}
        </DialContext.Provider>
    );
};

export default DialProvider