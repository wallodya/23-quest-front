"use-client";

import TopBar from "components/ui/TopBar";
import React from "react";
import {MenuDesktop} from "components/nav/menu";

export const DesktopHeader = () => {
    return (
        <TopBar isMobile={false}>        
            <MenuDesktop />
        </TopBar>
    );
};

