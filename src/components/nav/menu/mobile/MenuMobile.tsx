import FileIcon from "components/icons/FileIcon"
import HomeIcon from "components/icons/HomeIcon"
import PersonIcon from "components/icons/PersonIcon"
import ReaderIcon from "components/icons/ReaderIcon"
import Button from "components/ui/Button"
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
    return (
        <div className="flex flex-col justify-between gap-8">
            <ProfileCard>{children}</ProfileCard>
            <NavLinks links={PAGE_LINKS} toggleFn={toggleFn}/>
            <div className="px-4">
                <Button type="filled">Sign out</Button>
            </div>
        </div>
    );
};
