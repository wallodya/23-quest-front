"use client";

import Link from "next/link";
import { forwardRef, LegacyRef, MouseEvent, ReactNode, useState } from "react";
import { useSignOutMutation } from "store/api/api.slice";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Button from "components/ui/Button";
import MenuIcon from "components/icons/MenuIcon";
import { useAppSelector } from "store/hooks";
import PersonIcon from "components/icons/PersonIcon";
import SettingsIcon from "components/icons/SettingsIcon";

const PAGE_LINKS: { name: string; link: string }[] = [
    { name: "Home", link: "/home" },
    { name: "Quests", link: "/quests" },
    { name: "New task", link: "/new" },
];

const DROPDOWN_LINKS: {
    name: string;
    link: string;
    Icon: () => JSX.Element;
}[] = [
    { name: "Profile", link: "/profile", Icon: () => <PersonIcon size="xs" /> },
    {
        name: "Settings",
        link: "/settings",
        Icon: () => <SettingsIcon size="xs" />,
    },
];

const UserMenuDropdownTrigger = () => {
    const { login } = useAppSelector((state) => state.user);

    return (
        <DropdownMenu.Trigger asChild>
            <button
                className={
                    "group flex items-center gap-5 rounded-full border border-sky-700 py-1 pl-3 pr-[5px] text-sm font-medium text-sky-700 transition hover:border-sky-800 hover:bg-sky-800 hover:text-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-300 dark:border-sky-600 dark:text-sky-500 dark:hover:border-sky-600 dark:hover:bg-sky-600 dark:hover:text-slate-100 dark:focus:ring-sky-700"
                }
            >
                <span className="">{login}</span>
                <span className="rounded-full border-sky-700  p-1 group-hover:border-sky-800 dark:border-sky-600 dark:group-hover:border-slate-100">
                    <PersonIcon size={"xs"} />
                </span>
            </button>
        </DropdownMenu.Trigger>
    );
};

const NavLinks = () => (
    <>
        {PAGE_LINKS.map(({ name, link }, index) => (
            <li
                key={index}
                className="text-bold hidden items-center pr-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400 lg:flex"
            >
                <Link href={link}>{name}</Link>
            </li>
        ))}
    </>
);

const UserMenuDropdownContent = () => (
    <>
        {DROPDOWN_LINKS.map(({ name, link, Icon }, index) => (
            <DropdownMenu.Item
                key={index}
                className="flex items-center gap-2 py-1 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-700  hover:text-sky-500 dark:hover:text-sky-500"
            >
                <Icon />
                <Link href={link} className="">
                    {name}
                </Link>
            </DropdownMenu.Item>
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
            <li className="text-bold flex items-center pl-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                <DropdownMenu.Root>
                    <UserMenuDropdownTrigger />

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className="mt-4 w-48 rounded-lg bg-slate-200 py-3 px-4 shadow-sm shadow-slate-300 dark:bg-slate-700 dark:shadow-slate-900">
                            <UserMenuDropdownContent />
                            <DropdownMenu.Separator className="mt-3 border-t border-slate-600" />
                            <DropdownMenu.Item>
                                <Button
                                    type="text"
                                    buttonProps={{ onClick: handleSignOut }}
                                >
                                    Logout
                                </Button>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </li>
        </ul>
    );
};

export default NavBarDesktop;
