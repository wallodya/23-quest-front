import Link from "next/link";
import React from "react";

const MenuMobile = () => {
    return (
        <nav className="grid grid-cols-main py-2 bg-red-300">
            <ul className="col-start-2 flex justify-around bg-red-400">
                <li className="text-bold text-sky-900">
                    <Link href="/home">Home</Link>
                </li>
                <li className="text-bold text-sky-900">
                    <Link href="/quests">Quests</Link>
                </li>
                <li className="text-bold text-sky-900">
                    <Link href="/new">New</Link>
                </li>
                <li className="text-bold text-sky-900">
                    <Link href="/settings">Settings</Link>
                </li>
            </ul>
        </nav>
    );
};

export default MenuMobile;
