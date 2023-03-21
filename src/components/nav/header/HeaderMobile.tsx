"use client";

import MenuIcon from "components/icons/MenuIcon";
import TopBar from "components/ui/TopBar";
import Link from "next/link";
import { UserState } from "types/user.types";
import { useAppSelector } from "../../../store/hooks";
import DrawerSideMobie, { useMobileDrawer, UseMobileDrawerType } from "../menu/DrawerSideMobie";

const useHeaderContent = ({
    isSignedIn,
    login,
    toggleDrawer,
    isDrawerOpen,
}: UserState & ReturnType<UseMobileDrawerType>) => {
    if (isSignedIn) {
        return () => (
              <div className="col-start-2 flex items-center justify-between">
                  <button onClick={toggleDrawer}><MenuIcon size="md"/></button>
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                      {login}
                  </span>
                  <DrawerSideMobie
                      toggleDrawer={toggleDrawer}
                      isDrawerOpen={isDrawerOpen}
                  />
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
    const drawerControls = useMobileDrawer();

    const NavBarContent = useHeaderContent({...userState, ...drawerControls})

    return (
        <TopBar isMobile={true}>
            <NavBarContent />
        </TopBar>
    );
};

export default HeaderMobile;
