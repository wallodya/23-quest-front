"use client";

import TopBar from "components/ui/TopBar";
import Link from "next/link";
import { UserState } from "types/user.types";
import { useAppSelector } from "../../../store/hooks";
import DrawerSideMobie, { useMobileDrawer, UseMobileDrawerType } from "../menu/DrawerSideMobie";

const ICON_SIZE = "32"

const MenuIcon = () => (
    <svg
        width={ICON_SIZE}
        height={ICON_SIZE}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5H12.5C12.7761 5 13 4.77614 13 4.5C13 4.22386 12.7761 4 12.5 4H2.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
        ></path>
    </svg>
);

const useHeaderContent = ({
    isSignedIn,
    login,
    toggleDrawer,
    isDrawerOpen,
}: UserState & ReturnType<UseMobileDrawerType>) => {
    if (isSignedIn) {
        return () => (
              <div className="col-start-2 flex items-center justify-between">
                  <button onClick={toggleDrawer}><MenuIcon/></button>
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
