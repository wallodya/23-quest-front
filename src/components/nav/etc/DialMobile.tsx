import React, { useState } from "react";

const actions = [
    {
        name: "Task",
        icon: <></>
    },
    {
        name: "Quest",
        icon: <></>
    }
]

const DialMobile = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    return (
        // <SpeedDial
        //     ariaLabel="Speed dial add new"
        //     icon={<SpeedDialIcon />}
        //     sx={{ position: "absolute", bottom: 16, right: 16 }}
        //     FabProps={{
        //         className: "bg-sky-400",
        //     }}
        //     onClose={handleClose}
        //     onOpen={handleOpen}
        //     open={isOpen}
        // >
        //     {actions.map((action) => (
        //         <SpeedDialAction
        //             key={action.name}
        //             tooltipTitle={action.name}
        //             tooltipOpen
        //             icon={action.icon}
        //             FabProps={{
        //                 className: "dark:bg-slate-100 dark:text-slate-800 bg-slate-800 bg-slate-100",
        //                 classes: {}
        //             }}
        //         />
        //     ))}
        // </SpeedDial>
        <></>
    );
};

export default DialMobile;
