"use client";

import MenuIcon from "components/icons/MenuIcon";
import useDrawer, { UseMobileDrawerType } from "components/ui/Drawer/useDrawer.hook";
import TopBar from "components/ui/TopBar";
import Link from "next/link";
import { useAppSelector } from "store/hooks";
import { UserState } from "types/user.types";
import DrawerSideMobie from "../menu/Drawer/DrawerSideMobie";


const useHeaderContent = ({
    isSignedIn,
    login,
    toggleDrawer,
    isDrawerOpen
}: UserState & ReturnType<UseMobileDrawerType>) => {

    if (isSignedIn) {
        return () => (
              <div className="col-start-2 flex items-center justify-between">
                  <button onClick={toggleDrawer}><MenuIcon size="sm"/></button>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                      {login}
                  </span>
                  <DrawerSideMobie isOpen={isDrawerOpen} toggleFn={toggleDrawer}/>
              </div>
        )
    } else {
        return () => (
              <div className="col-start-2 flex">
                  <Link href="sign-in" className="ml-auto flex">
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                          Sign in
                      </span>
                  </Link>
              </div>
        )
    }
};

const HeaderMobile = () => {
    const userState = useAppSelector((state) => state.user);
    const drawerControls = useDrawer();

    const NavBarContent = useHeaderContent({...userState, ...drawerControls})

    return (
        <TopBar isMobile={true}>
            <NavBarContent />
        </TopBar>
    );
};

export default HeaderMobile;
