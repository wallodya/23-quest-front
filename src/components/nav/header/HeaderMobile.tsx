"use client";

import CrossIcon from "components/icons/CrossIcon";
import MenuIcon from "components/icons/MenuIcon";
import Button from "components/ui/Button";
import Drawer, { useDrawerControls } from "components/ui/Drawer";
import TopBar from "components/ui/TopBar";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { useAppSelector } from "store/hooks";

const HeaderMobileGuest = () => {
    return (
        <div className="col-start-2 flex">
            <Link href="sign-in" className="ml-auto flex">
                <span className="font-bold text-slate-800 dark:text-slate-100">
                    Sign in
                </span>
            </Link>
        </div>
  )
}

const HeaderMobileUser = ({children, login}:{children: ReactNode, login: string}) => {
    return (
        <TopBar isMobile={true}>
            <div className="col-start-2 flex items-center justify-between">
                {children}
                <span className="font-bold text-slate-800 dark:text-slate-100">
                    {login}
                </span>
            </div>
        </TopBar>
    );
} 

const HeaderMobile = () => {
    const { login, isSignedIn } = useAppSelector((state) => state.user);

    const { isOpen, toggleDrawer } = useDrawerControls()
    if (!isSignedIn) {
        return <HeaderMobileGuest/>
    }

    return (
        <HeaderMobileUser login={login ?? ""} >
                <button onClick={toggleDrawer}>
                    <MenuIcon size="sm" />
                </button>
                <Drawer.Root isOpen={isOpen} drawerPosition={"left"}>
                    <Drawer.Content>
                        <Drawer.InnerControls toggleFn={toggleDrawer} />
                        hello test 222
                    </Drawer.Content>
                    <Drawer.Background toggleFn={toggleDrawer} />
                </Drawer.Root>
        </HeaderMobileUser>
    );
};

export default HeaderMobile;
