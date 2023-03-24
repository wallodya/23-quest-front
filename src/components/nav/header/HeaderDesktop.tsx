"use-client";

import TopBar from "components/ui/TopBar";
import React from "react";
import MenuDesktop from "../menu/MenuDesktop";

const DesktopHeader = () => {
    return (
        <TopBar isMobile={false}>        
            <MenuDesktop />
        </TopBar>
    );
};

export default DesktopHeader;
