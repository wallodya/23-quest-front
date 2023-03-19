"use client";

import LogoutRounded from "@mui/icons-material/LogoutRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import PersonRounded from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { useSignOutMutation } from "../../../store/api/api.slice";

const NavBarDesktop = () => {
    const [anchorElement, setAnchorElement] =
        useState<HTMLButtonElement | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpenProfileMenu = (event: MouseEvent<HTMLButtonElement>) => {
        if (!anchorElement) {
            setAnchorElement(event.currentTarget);
        }
        setIsOpen(true);
    };
    const handleCloseProfileMenu = () => {
        setIsOpen(false);
    };

    const [signOut, {}] = useSignOutMutation();
    const handleSignOut = () => {
        signOut()
            .unwrap()
            .catch((err) => console.log(err));
    };

    return (
        <ul className="col-start-3 flex justify-around text-sm font-semibold">
            <li className="text-bold flex items-center pr-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                <Link href="/home">Home</Link>
            </li>
            <li className="text-bold flex items-center px-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                <Link href="/quests">Quests</Link>
            </li>
            <li className="text-bold flex items-center px-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                <Link href="/new">New</Link>
            </li>
            <li className="text-bold flex items-center pl-4 transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                <Button
                    id="profile-menu-button"
                    onClick={handleOpenProfileMenu}
                    aria-controls={isOpen ? "profile-menu" : undefined}
                    aria-expanded={isOpen ? "true" : undefined}
                    aria-haspopup="true"
                    variant="outlined"
                    color="inherit"
                >
                    <MenuRounded color="inherit" fontSize="medium" />
                </Button>
                <Menu
                    id="profile-menu"
                    sx={{
                        bgcolor: "dark",
                    }}
                    anchorEl={anchorElement}
                    open={isOpen}
                    onClose={handleCloseProfileMenu}
                    MenuListProps={{
                        "aria-labelledby": "profile-menu-button",
                    }}
                    PaperProps={{
                        className:
                            "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
                    }}
                >
                    <MenuItem onClick={handleCloseProfileMenu}>
                        <ListItemIcon>
                            <PersonRounded />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleCloseProfileMenu}>
                        <ListItemIcon>
                            <SettingsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleSignOut}>
                        <ListItemIcon>
                            <LogoutRounded />
                        </ListItemIcon>
                        <ListItemText>Log out</ListItemText>
                    </MenuItem>
                </Menu>
            </li>
        </ul>
    );
};

export default NavBarDesktop;
