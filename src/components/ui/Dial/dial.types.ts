import { UrlObject } from "url";

export type DialAction = {
    tooltipText: string;
    isTooltipShown?: boolean;
    closeOnPush?: boolean;
    Icon: () => JSX.Element;
    type: "link" | "handler";
    href?: string | UrlObject;
    action?: () => void;
};

export type DialPositions = "bottom-left" | "bottom-right" | "top-left" | "top-right"

export type DialOptions = Partial<
    {
        isAnimated: boolean;
        isStyled: boolean;
        dialPosition: DialPositions;
        pages: string[] | null;
        Icon: () => JSX.Element;
        withActions: boolean;
        actions: DialAction[];
        handler: () => void
    }
>;

export type DialControls = {
    toggleDial: () => void,
    closeDial: () => void,
    isOpen: boolean
}