import { FC } from "react";

export type DrawerPositions = "left" | "right" | "top" | "bottom"

export type DrawerOptions = Partial<
    {
        isAnimated: boolean;
        isStyled: boolean;
        drawerPosition: DrawerPositions;
        pages: string[] | null;
        excludePages: string[] | null
    }
>;

export type DrawerControls = {
    toggleDrawer: () => void,
    isOpen: boolean,
    closeDrawer: () => void,
    options?: Required<DrawerOptions>
}

export type UseDrawer = (options?: DrawerOptions) => {
    Drawer: FC,
    controls: DrawerControls
}
