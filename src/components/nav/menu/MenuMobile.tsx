import Link from "next/link";
import React from "react";

const MenuMobile = () => {
    return (
        <nav className="grid grid-cols-main py-2">
            <ul className="col-start-2 flex justify-around">
                <li className="text-bold">
                    <Link href="/home">Home</Link>
                </li>
                <li className="text-bold">
                    <Link href="/quests">Quests</Link>
                </li>
                <li className="text-bold">
                    <Link href="/new">New</Link>
                </li>
                <li className="text-bold">
                    <Link href="/settings">Settings</Link>
                </li>
            </ul>
        </nav>
    );
};

export default MenuMobile;
