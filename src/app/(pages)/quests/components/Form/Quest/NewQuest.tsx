"use client";

import { useEffect, useState } from "react";
import { QuestFormDialog } from "./QuestFormDialog";
import { QuestFormDrawer } from "./QuestFormDrawer";
import { useMobileScreenSize } from "common/hooks";

export const NewQuest = () => {
    const isDrawer = useMobileScreenSize();
    if (isDrawer) {
        return <QuestFormDrawer />;
    } else {
        return <QuestFormDialog />;
    }
};
