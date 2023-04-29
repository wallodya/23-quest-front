import { SignOutButton } from "@user/components/SignOutButton"
import FileIcon from "components/icons/FileIcon"
import HomeIcon from "components/icons/HomeIcon"
import ReaderIcon from "components/icons/ReaderIcon"
import { ReactNode } from "react"
import NavLinks, { DrawerPageLink } from "./NavLinks"
import ProfileCard from "./ProfileCard"

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
]

export const MenuMobile = ({
    children,
    toggleFn,
}: {
    children: ReactNode;
    toggleFn: () => void;
}) => {
    return (
        <div className="flex flex-col justify-between gap-8">
            <ProfileCard>{children}</ProfileCard>
            <NavLinks links={PAGE_LINKS} toggleFn={toggleFn} />
            <div className="px-4">
                <SignOutButton/>
            </div>
        </div>
    );
};
