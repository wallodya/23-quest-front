import React from "react";

type DividerProps = {
    type: "space" | "line"
}

const Divider = ({ type }: DividerProps) => {
    return (
        <div className="my-2 w-full">
            {type === "line" && (
                <div className="mx-4 outline outline-1 outline-slate-200 dark:outline-slate-700"></div>
            )}
        </div>
    );
};

export default Divider;
