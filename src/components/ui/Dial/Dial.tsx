import React, { createContext, ReactNode, useContext } from "react";

type DialActions = ({
    tooltipText: string;
    isTooltipShown?: boolean;
    closeOnPush?: boolean;
    Icon: () => JSX.Element;
} & (
    | {
          type: "link";
          href: string;
      }
    | {
          type: "handler";
          action: () => void;
      }
))[];

const DialContext = createContext({ dialControls: {} });
const useDial = (dialId: string) => {
    const dials = useContext(DialContext);
}
const DialProvider = ({ children }: { children: ReactNode }) => {
    return (
        <DialContext.Provider value={{ dialControls: {} }}>
            {children}
        </DialContext.Provider>
    );
};
const Void = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <div
            className="fixed top-0 left-0 h-screen w-screen bg-gradient-to-t from-slate-800"
            onClick={handleClose}
        ></div>
    );
};

const Dial = () => {
    return <div>Dial</div>;
};

export default Dial;
