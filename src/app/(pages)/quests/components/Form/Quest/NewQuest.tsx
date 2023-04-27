"use client";

import { useEffect, useState } from "react";
import { QuestFormDialog } from "./QuestFormDialog";
import { QuestFormDrawer } from "./QuestFormDrawer";

export const NewQuest = () => {
    const [isDialog, setIsDialog] = useState<boolean>(false)
    const TW_MD_WIDTH = 768;
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= TW_MD_WIDTH) {
            setIsDialog(true)
        }
    })
    if (isDialog) {
        return (
            <QuestFormDialog/>
        );
    } else {
        return (
            <QuestFormDrawer/>
        );
    }
};
