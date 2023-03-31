"use client";

import { openTaskForm } from "@task/features";
import TasksConfig from "@task/tasks.config";
import { useIsIncludedOnPage } from "common/hooks";
import FileIcon from "components/icons/FileIcon";
import ReaderIcon from "components/icons/ReaderIcon";
import useDial from "components/ui/Dial";
import { DialAction } from "components/ui/Dial/dial.types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useAppDispatch } from "store";


const PAGES_WO_DIAL = ["sign-up", "sign-in"];

const DialMobile = () => {
    const dispatch = useAppDispatch()
    const DIAL_ACTIONS: DialAction[] = [
        {
            tooltipText: "New task",
            isTooltipShown: true,
            Icon: () => <FileIcon size="sm" />,
            type: "link",
            href: `/tasks?${TasksConfig.tabs.urlParam}=${TasksConfig.tabs.acitve.urlParamValue}&${TasksConfig.form.urlParam}`,
            closeOnPush: true,
            action: () => dispatch(openTaskForm())
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
    const Dial = useDial({ withActions: true, actions: DIAL_ACTIONS, dialPosition: "bottom-right" });
    const isIncludedOnPage = useIsIncludedOnPage(null, PAGES_WO_DIAL)
    if (!isIncludedOnPage) {
        return null
    }
    return (
        <Dial />
    );
};

export default DialMobile;
