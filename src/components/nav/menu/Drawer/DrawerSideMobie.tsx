import Button from "components/ui/Button";
import Divider from "components/ui/Divider";
import Link from "next/link";

import Drawer from "components/ui/Drawer/Drawer";
import { useSignOut } from "common/hooks/useSignOut.hook";
import {
    DROPDOWN_LINKS
} from "../../etc/NavBarDesktopDropDown";
import useDrawer from "components/ui/Drawer/useDrawer.hook";

export const DrawerLinks = ({
    links,
}: {
    links: { name: string; link: string; Icon: () => JSX.Element }[];
}) => (
    <div className="pr-10 flex flex-col items-start gap-2">
        {links.map(({ link, name, Icon }, index) => (
            <Link href={link} key={index} className="flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-400">
                <Icon />
                {name}
            </Link>
        ))}
    </div>
);

const DrawerSideMobie = ({isOpen, toggleFn}: {isOpen: boolean, toggleFn: () => void}) => {
    const { handleSignOut } = useSignOut({
        onSuccess: () => console.log("sign out from drawer"),
    });

    return (
        <Drawer toggleFn={toggleFn} isOpen={isOpen}>
            <div className="pr-16 pl-4">
                <Divider type="space" />
                <DrawerLinks links={DROPDOWN_LINKS} />
                <Divider type="space" />
            </div>
                    <Button type="text" buttonProps={{ onClick: handleSignOut }}>
                        Sign out
                    </Button>
        </Drawer>
    );
};

export default DrawerSideMobie;
