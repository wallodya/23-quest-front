"use client";

import { useIsIncludedOnPage } from "common/hooks";
import FileIcon from "components/icons/FileIcon";
import ReaderIcon from "components/icons/ReaderIcon";
import useDial from "components/ui/Dial";
import { DialAction } from "components/ui/Dial/dial.types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const DIAL_ACTIONS: DialAction[] = [
    {
        tooltipText: "New task",
        isTooltipShown: true,
        Icon: () => <FileIcon size="sm" />,
        type: "link",
        href: "/new-task"
    },
    {
        tooltipText: "New quest",
        isTooltipShown: true,
        Icon: () => <ReaderIcon size="sm" />,
        type: "link",
        href: "/new-quest"
    },
];

const PAGES_WITH_DIAL = [""];

const DialMobile = () => {
    const Dial = useDial({ withActions: true, actions: DIAL_ACTIONS, dialPosition: "bottom-right" });
    const isIncludedOnPage = useIsIncludedOnPage(null, ["sign-up", "sign-in"])
    if (!isIncludedOnPage) {
        return null
    }
    return (
        <Dial />
    );
};

export default DialMobile;
