import { withUnbreakableSpaces } from "common/utils";
import Button from "components/ui/Button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="flex h-full flex-col items-center justify-center">
            <div className="flex w-fit flex-col items-start gap-2">
                <h1 className="text-xl font-bold text-sky-600">Not found</h1>
                <p className="text-slate-400">This page does not exist</p>
                <div className="mt-2 self-center">
                    <Link href={"/"}>
                        <Button type="filled">
                            {withUnbreakableSpaces("Back home")}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
