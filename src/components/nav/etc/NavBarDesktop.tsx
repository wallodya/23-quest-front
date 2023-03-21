"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import withUnbreakableSpaces from "common/utils/withUnbreakableSpaces";
import Button from "components/ui/Button";
import Link from "next/link";
import { ReactNode } from "react";
import { useSignOutMutation } from "store/api/api.slice";
import { UserMenuDropdownContent, UserMenuDropdownTrigger } from "./NavBarDesktopDropDown";

const PAGE_LINKS: { name: string; link: string }[] = [
    { name: "Home", link: "/home" },
    { name: "Quests", link: "/quests" },
    { name: "New task", link: "/new" },
];

const NavLinks = () => (
    <>
        {PAGE_LINKS.map(({ name, link }, index) => (
            <li
                key={index}
                className="text-bold hidden items-center pr-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400 lg:flex"
            >
                <Link href={link}>{withUnbreakableSpaces(name)}</Link>
            </li>
        ))}
    </>
);

const NavBarDesktop = () => {
    const [signOut, {}] = useSignOutMutation();
    const handleSignOut = () => {
        signOut()
            .unwrap()
            .catch((err) => console.log(err));
    };

    return (
        <ul className="col-start-3 flex justify-between text-sm font-semibold">
            <NavLinks />
            <div className="ml-auto text-bold flex items-center pl-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                <DropdownMenu.Root>
                    <UserMenuDropdownTrigger />

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className="mt-4 w-48 rounded-lg bg-slate-200 py-3 px-4 shadow-sm shadow-slate-300 dark:bg-slate-700 dark:shadow-slate-900">
                            <UserMenuDropdownContent />
                            <DropdownMenu.Separator className="mt-3 mb-2 border-t border-slate-600" />
                            <DropdownMenu.Item className="">
                                <Button
                                    type="text"
                                    buttonProps={{ onClick: handleSignOut }}
                                >
                                    Sign out
                                </Button>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </ul>
    );
};

export default NavBarDesktop;
