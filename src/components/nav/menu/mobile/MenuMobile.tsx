"use client"

import FileIcon from "components/icons/FileIcon"
import HomeIcon from "components/icons/HomeIcon"
import PersonIcon from "components/icons/PersonIcon"
import ReaderIcon from "components/icons/ReaderIcon"
import Button from "components/ui/Button"
import { ReactNode, useEffect } from "react"
import NavLinks, { DrawerPageLink } from "./NavLinks"
import ProfileCard from "./ProfileCard"
import { useAppDispatch } from "store"
import { useSignOutMutation } from "store/api"
import { useRouter } from "next/navigation"
import { resetQuestState } from "@quest/features"
import { resetTaskState } from "@task/features"
import { removeUser } from "@user/features"

const PAGE_LINKS: DrawerPageLink[] = [
    {
        name: "Home",
        Icon: () => <HomeIcon size="sm"/>,
        href: "/"
    },
    {
        name: "Quests",
        Icon: () => <ReaderIcon size="sm"/>,
        href: "/quests"
    },
    {
        name: "Tasks",
        Icon: () => <FileIcon size="sm"/>,
        href: "/tasks"
    },
    {
        name: "Profile",
        Icon: () => <PersonIcon size="sm"/>,
        href: "/profile"
    },
]

export const MenuMobile = ({
    children,
    toggleFn,
}: {
    children: ReactNode;
    toggleFn: () => void;
}) => {
    const [signOut, { isLoading, isSuccess }] = useSignOutMutation()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const handleSignOut = () => {
        signOut()
            .unwrap()
            .then(() => {
                dispatch(resetQuestState())
                dispatch(resetTaskState())
                const currentTime = String(new Date())
                dispatch(removeUser({ refreshedAt: currentTime }));
                router.push("/sign-in")
            })
            .catch(err => console.log(" Sign out error: ", err))
    }
    return (
        <div className="flex flex-col justify-between gap-8">
            <ProfileCard>{children}</ProfileCard>
            <NavLinks links={PAGE_LINKS} toggleFn={toggleFn} />
            <div className="px-4">
                <Button type="filled" buttonProps={{ onClick: handleSignOut }}>
                    Sign out
                </Button>
            </div>
        </div>
    );
};
