"use client";

import FileIcon from "components/icons/FileIcon";
import PencilIcon from "components/icons/PencilIcon";
import ReaderIcon from "components/icons/ReaderIcon";
import React, { forwardRef, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import withUnbreakableSpaces from "common/utils/withUnbreakableSpaces";
import useDial from "components/ui/Dial";
import { DialAction } from "components/ui/Dial/dial.types";

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
    const { Dial } = useDial({ withActions: true, actions: DIAL_ACTIONS, dialPosition: "bottom-right" });
    return (
        <Dial />
    );
};

export default DialMobile;
