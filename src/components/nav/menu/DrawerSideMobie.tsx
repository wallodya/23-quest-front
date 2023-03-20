import Link from "next/link";

import React, { FC, useState } from "react";
import { useSignOut } from "../../../common/hooks/useSignOut.hook";

type UseMobileDrawerType = () => {
    toggleDrawer: () => void,
    isDrawerOpen: boolean
}
type DrawerSideMobieProps = ReturnType<UseMobileDrawerType>
export const useMobileDrawer: UseMobileDrawerType = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return {
        toggleDrawer,
        isDrawerOpen
    }
}

const DrawerSideMobie: FC<DrawerSideMobieProps> = ({ toggleDrawer, isDrawerOpen }) => {
    const { handleSignOut } = useSignOut({
        onSuccess: () => console.log("sign out from drawer")
    })

    return (
        // <Drawer
        //     anchor="left"
        //     open={isDrawerOpen}
        //     onClose={toggleDrawer}
        //     PaperProps={{
        //         className:
        //             "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 pr-7 py-5",
        //     }}
        // >
        //     <List>
        //         <Link href="profile">
        //             <ListItem className="flex gap-3">
        //                 <ListItemIcon style={{ minWidth: "auto" }}>
        //                     <PersonRounded />
        //                 </ListItemIcon>
        //                 <ListItemText>
        //                     <Typography>Profile</Typography>
        //                 </ListItemText>
        //             </ListItem>
        //         </Link>

        //         <Link href="settings">
        //             <ListItem className="flex gap-3">
        //                 <ListItemIcon style={{ minWidth: "auto" }}>
        //                     <SettingsRounded />
        //                 </ListItemIcon>
        //                 <ListItemText>
        //                     <Typography>Settings</Typography>
        //                 </ListItemText>
        //             </ListItem>
        //         </Link>
        //     </List>

        //     <Divider />

        //     <List>
        //         <ListItem onClick={handleSignOut} className="flex gap-3">
        //             <ListItemIcon style={{ minWidth: "auto" }}>
        //                 <LogoutRounded />
        //             </ListItemIcon>
        //             <ListItemText>
        //                 <Typography>Log out</Typography>
        //             </ListItemText>
        //         </ListItem>
        //     </List>
        // </Drawer>
        <></>
    );
};

export default DrawerSideMobie;
