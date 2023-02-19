import Link from "next/link";
import React from "react";

const HeaderMobile = () => {
    return (
        <header className="grid grid-cols-main bg-red-300">
           <div className="col-start-2 bg-red-400">
                <p>Username</p>
           </div>
        </header>
    );
};

export default HeaderMobile;
