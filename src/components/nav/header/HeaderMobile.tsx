"use client";

import MenuIcon from "components/icons/MenuIcon";
import { Drawer, useControls as useDrawerControls } from "components/ui/Drawer";
import TopBar from "components/ui/TopBar";
import { MenuMobile } from "components/nav/menu";
import Link from "next/link";
import { ReactNode } from "react";
import { useAppSelector } from "store/hooks";
import { useIsIncludedOnPage } from "common/hooks";

const HeaderGuest = () => {
    return (
        <TopBar isMobile={true}>
            <div className="col-start-2 flex">
                <Link href="sign-in" className="ml-auto flex">
                    <span className="font-bold text-slate-800 dark:text-slate-100">
                        Sign in
                    </span>
                </Link>
            </div>
        </TopBar>
  )
}

const HeaderUser = ({children}:{children: ReactNode}) => {
    return (
        <TopBar isMobile={true}>
            <div className="col-start-2 flex items-center justify-between">
                {children}
            </div>
        </TopBar>
    );
} 

export const MobileHeader = () => {
    const { isSignedIn } = useAppSelector((state) => state.user);
    const isIncludedOnPage = useIsIncludedOnPage(null, ["sign-up", "sign-in"])
    const { isOpen, toggleDrawer } = useDrawerControls()
    
    if (!isIncludedOnPage) {
        return null
    }
    if (!isSignedIn) {
        return <HeaderGuest/>
    }

    return (
        <HeaderUser>
                <button onClick={toggleDrawer}>
                    <MenuIcon size="sm" />
                </button>
                <Drawer.Root isOpen={isOpen} drawerPosition={"left"}>
                    <Drawer.Content>
                        <MenuMobile toggleFn={toggleDrawer}>
                            <Drawer.InnerControls toggleFn={toggleDrawer} />
                        </MenuMobile>
                    </Drawer.Content>
                    <Drawer.Background toggleFn={toggleDrawer} />
                </Drawer.Root>
        </HeaderUser>
    );
};
