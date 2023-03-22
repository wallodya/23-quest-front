export type DialActions = ({
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

export type DialOptions = Partial<{
    isAnimated: boolean,
    isStyled: boolean,
    dialPosition: "bottom-left" | "bottom-right" | "top-left" | "top-right",
    pages: string[] | null
}>

export type DialControls = {
    toggleDial: () => void,
    closeDial: () => void,
    isOpen: boolean
}