import Button from "components/ui/Button";
import Link from "next/link";
import React from "react";
import { useSignInMutation } from "../../../store/api/api.slice";

// Should have a Button element
const NavBarDesktopGuest = () => {
    return (
        <div className="col-start-3 flex items-center justify-end">
            <div className="ml-auto">
                <Button type="filled">
                    <Link href="/sign-in">Sign in</Link>
                </Button>
            </div>
        </div>
    );
};

export default NavBarDesktopGuest;
