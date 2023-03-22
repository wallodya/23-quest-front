export type DialAction = {
    tooltipText: string;
    isTooltipShown?: boolean;
    closeOnPush?: boolean;
    Icon: () => JSX.Element;
    type: "link" | "handler";
    href?: string;
    action?: () => void;
};
// export type DialAction = {
//     tooltipText: string;
//     isTooltipShown?: boolean;
//     closeOnPush?: boolean;
//     Icon: () => JSX.Element;
// } & (
//     | {
//           type: "link";
//           href: string;
//       }
//     | {
//           type: "handler";
//           action: () => void;
//       }
// );

export type DialOptions = Partial<
    {
        isAnimated: boolean;
        isStyled: boolean;
        dialPosition: "bottom-left" | "bottom-right" | "top-left" | "top-right";
        pages: string[] | null;
        Icon: () => JSX.Element;
        withActions: boolean;
        actions: DialAction[];
        handler: () => void
    }
>;
// export type DialOptions = Partial<
//     {
//         isAnimated: boolean;
//         isStyled: boolean;
//         dialPosition: "bottom-left" | "bottom-right" | "top-left" | "top-right";
//         pages: string[] | null;
//         Icon: () => JSX.Element;
//     } & (
//         | { withActions: true; actions: DialAction[] }
//         | { withActions: false; handler: () => void }
//     )
// >;

export type DialControls = {
    toggleDial: () => void,
    closeDial: () => void,
    isOpen: boolean
}