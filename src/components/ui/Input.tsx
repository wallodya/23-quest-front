import React, { forwardRef, InputHTMLAttributes, LegacyRef } from "react";

export type InputProps = {
    prefix?: string,
    postfix?: string,
} & InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef(({prefix, postfix, ...props}: InputProps, ref: LegacyRef<HTMLInputElement>) => {
    return (
        <div>
            <input
                {...props}
                ref={ref}
                className="block w-full rounded-lg border border-slate-300 bg-slate-100 p-2.5 text-sm text-slate-800 focus:border-sky-500 focus:ring-sky-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-gray-400 dark:focus:border-sky-400 dark:focus:ring-sky-400"
            />
        </div>
    );
});

export default Input;
