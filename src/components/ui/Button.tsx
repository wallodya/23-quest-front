import React, {
    ButtonHTMLAttributes,
    forwardRef,
    LegacyRef,
    ReactNode,
    RefAttributes,
} from "react";
import * as Form from "@radix-ui/react-form";

type ButtonTypes = "filled" | "text" | "outlined";

interface ButtonProps {
    type: ButtonTypes;
    children: ReactNode;
    isLoading?: boolean;
    buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const useButtonClassNames = (type: ButtonTypes, isDisabled?: boolean): string => {
    switch (type) {
        case "filled":
            return isDisabled ? "bg-slate-500 text-slate-300 cursor-not-allowed" : "bg-sky-700 text-slate-100 hover:bg-sky-800 dark:bg-sky-500 dark:hover:bg-sky-600";
        case "text":
            return isDisabled ? "text-slate-500 cursor-not-allowed" :"text-sky-700 hover:text-sky-800 dark:text-sky-500 dark:hover:text-sky-600";

        case "outlined":
            return isDisabled ? "text-slate-400 border border-slate-400 cursor-not-allowed" :"text-sky-700 hover:text-slate-100 dark:text-sky-500 dark:hover:text-slate-100 hover:bg-sky-800 dark:hover:bg-sky-600 border border-sky-700 dark:border-sky-600 hover:border-sky-800 dark:hover:border-sky-600";
    }
};

const Button = forwardRef(
    (
        { children, isLoading, type, buttonProps }: ButtonProps,
        ref: LegacyRef<HTMLButtonElement> | undefined,
    ) => {
        const buttonTypeClassNames = useButtonClassNames(type, buttonProps?.disabled);
        return (
            <button
                ref={ref}
                {...buttonProps}
                className={
                    "w-full flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-700 " +
                    buttonTypeClassNames
                }
            >
                {isLoading ? "Loading..." : children}
            </button>
        );
    },
);

export default Button;
