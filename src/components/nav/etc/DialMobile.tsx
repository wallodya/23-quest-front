"use client";

import { openQuestForm } from "@quest/features";
import { openTaskForm } from "@task/features";
import TasksConfig from "@task/tasks.config";
import { useIsIncludedOnPage } from "common/hooks";
import FileIcon from "components/icons/FileIcon";
import ReaderIcon from "components/icons/ReaderIcon";
import { Dial } from "components/ui/Dial";
import { DialAction, DialOptions } from "components/ui/Dial/dial.types";
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
            action: () => dispatch(openQuestForm())
        },
    ];
    const dialOptions: DialOptions = {
        withActions: true,
        actions: DIAL_ACTIONS,
        dialPosition: "bottom-right",
    };
    const isIncludedOnPage = useIsIncludedOnPage(null, PAGES_WO_DIAL)
    if (!isIncludedOnPage) {
        return null
    }
    return (
        <Dial options={dialOptions}/>
    );
};

export default DialMobile;
