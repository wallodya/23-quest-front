import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { SignOutButton } from "@user/components/SignOutButton";
import { withUnbreakableSpaces } from "common/utils";
import Link from "next/link";
import {
    UserMenuDropdownContent,
    UserMenuDropdownTrigger,
} from "./NavBarDesktopDropDown";

const PAGE_LINKS: { name: string; link: string }[] = [
    { name: "Home", link: "/home" },
    { name: "Quests", link: "/quests" },
    { name: "Tasks", link: "/tasks" },
];

const NavLinks = () => (
    <ul className="flex gap-4 items-center">
        {PAGE_LINKS.map(({ name, link }, index) => {
            return (
                <li key={index}>
                    <Link
                        href={link}
                        className="text-bold hidden items-center pr-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400 lg:flex"
                    >
                        {withUnbreakableSpaces(name)}
                    </Link>
                </li>
            );
        })}
    </ul>
);

const NavBarDesktop = () => {
    return (
        <nav className="col-start-3 flex justify-between text-sm font-semibold">
            <NavLinks />
            <div className="text-bold ml-auto flex items-center pl-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                <DropdownMenu.Root>
                    <UserMenuDropdownTrigger />

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className="relative z-40 mt-4 w-72 rounded-lg bg-slate-200 py-3 px-4 shadow-sm shadow-slate-300 dark:bg-slate-700 dark:shadow-slate-900">
                            <UserMenuDropdownContent />
                            <DropdownMenu.Separator className="mt-3 mb-2 border-t border-slate-600" />
                            <DropdownMenu.Item className="">
                                <SignOutButton type={"text"}/>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </nav>
    );
};

export default NavBarDesktop;
