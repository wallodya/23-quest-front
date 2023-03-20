import React, { forwardRef, InputHTMLAttributes, LegacyRef } from "react";

const Checkbox = forwardRef(
    (
        props: InputHTMLAttributes<HTMLInputElement>,
        ref: LegacyRef<HTMLInputElement>,
    ) => {
        return (
            <input
                type={"checkbox"}
                {...props}
                className="h-4 w-4 rounded border-slate-300 bg-slate-200 text-sky-600 focus:ring-2 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:ring-offset-slate-800 dark:focus:ring-sky-400"
            />
        );
    },
);

export default Checkbox;
