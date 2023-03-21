"use-client";

import TopBar from "components/ui/TopBar";
import Link from "next/link";
import React from "react";
import MenuDesktop from "../menu/MenuDesktop";

const Header = () => {
    return (
        <TopBar isMobile={false}>        
            <MenuDesktop />
        </TopBar>
    );
};

export default Header;
