import { ReactNode } from "react";
import { useAppSelector } from "../../store/hooks";
import DialMobile from "components/nav/etc/DialMobile";
import HeaderDesktop from "../nav/header/HeaderDesktop";
import HeaderMobile from "../nav/header/HeaderMobile";
import MenuMobile from "components/nav/menu/MenuMobile";
import { useRouter } from "next/router";

const GlobalLayout = ({ children }: { children: ReactNode }) => {
    const { isSignedIn } = useAppSelector(state => state.user)


    return (
        <>
            <HeaderDesktop />
            <div className="min-h-screen grid grid-cols-main items-stretch">
            <HeaderMobile />
                <main className="col-start-2 self-start relative pt-16 flex flex-col justify-between gap-4 h-full w-full">
                        {children}
                </main>
            </div>
            {/* {isSignedIn && <MenuMobile />} */}
            {isSignedIn && <DialMobile />}
        </>
    );
};

export default GlobalLayout;
