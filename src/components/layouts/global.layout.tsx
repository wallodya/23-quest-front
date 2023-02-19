import { ReactNode } from "react";
import HeaderDesktop from "../nav/header/HeaderDesktop";
import HeaderMobile from "../nav/header/HeaderMobile";
import MenuMobile from "../nav/menu/MenuMobile";

const GlobalLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-full">
            <div className="hidden sm:block sticky w-screen top-0">
                <HeaderDesktop />
            </div>
            <div className="sm:hidden sticky w-screen top-0">
                <HeaderMobile />
            </div>
            <div className="grid h-full grid-cols-main">
                <div className="col-start-2 flex flex-col justify-between gap-4 bg-slate-300">
                    <main className="bg-green-400">
                        {children}
                    </main>
                </div>
            </div>
            <div className="sm:hidden sticky w-screen bottom-0">
                <MenuMobile />
            </div>
        </div>
    );
};

export default GlobalLayout;
