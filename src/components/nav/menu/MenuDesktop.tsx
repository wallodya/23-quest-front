import Link from "next/link";
import React from "react";

const MenuDesktop = () => {
    return (
        <nav className="col-start-2 grid grid-cols-2 py-4 bg-red-400">
            <div>
                Logo
            </div>
            <ul className="flex justify-around">
                <li className="pr-4 text-bold text-sky-900">
                    <Link href="/home">Home</Link>
                </li>
                <li className="px-4 text-bold text-sky-900">
                    <Link href="/quests">Quests</Link>
                </li>
                <li className="px-4 text-bold text-sky-900">
                    <Link href="/new">New</Link>
                </li>
                <li className="pl-4 text-bold text-sky-900">
                    <Link href="/settings">Settings</Link>
                </li>
            </ul>
        </nav>
    );
};

export default MenuDesktop;
