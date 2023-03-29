"use client";

import TasksConfig from "@task/tasks.config";
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
        href: `/tasks?${TasksConfig.tabs.urlParam}=${TasksConfig.tabs.acitve.urlParamValue}&${TasksConfig.form.urlParam}`,
        closeOnPush: true,
    },
    {
        tooltipText: "New quest",
        isTooltipShown: true,
        Icon: () => <ReaderIcon size="sm" />,
        type: "link",
        href: "/quests",
        closeOnPush: true,
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
