import CrossIcon from "components/icons/CrossIcon";
import Button from "components/ui/Button";
import Link from "next/link";
import { ReactNode } from "react";
import useDrawer from "./useDrawer.hook";

type WrapperProps = {
    toggleFn: () => void;
    isOpen: boolean;
    children: ReactNode;
    className: string
}

type DrawerProps = {
    children: ReactNode;
    toggleFn: () => void;
    isOpen: boolean
}

const Void = ({ toggleFn }: { toggleFn: () => void }) => (
    <div className={`w-full dark:bg-slate-800/70`} onClick={toggleFn}></div>
);

const ToggleControls = ({toggleFn} : {toggleFn: () => void}) => {
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

const Wrapper = ({ toggleFn, isOpen, children, className }: WrapperProps) => {
    const drawerDisplayClass = isOpen ? "fixed" : "hidden";
    return (
        <div
            className={`${drawerDisplayClass} top-0 left-0 flex h-screen w-screen`}
        >
            <div className={className}>
                <ToggleControls toggleFn={toggleFn}/>
                {children}
            </div>
            <Void toggleFn={toggleFn} />
        </div>
    );
};

const Drawer = ({children, isOpen, toggleFn}: DrawerProps) => {
    return (
        <Wrapper className="bg-slate-200 dark:bg-slate-700 transition-all duration-1000" isOpen={isOpen} toggleFn={toggleFn}>
            {children}
        </Wrapper>
    )
}

Drawer.Void = Void
Drawer.ToggleControls = ToggleControls
Drawer.Wrapper = Wrapper

export default Drawer
