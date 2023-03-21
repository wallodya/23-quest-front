import React from 'react'
import { useAppSelector } from 'store/hooks';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import PersonIcon from 'components/icons/PersonIcon';
import Link from 'next/link';
import SettingsIcon from 'components/icons/SettingsIcon';

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


export const UserMenuDropdownTrigger = () => {
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


export const UserMenuDropdownContent = () => (
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