import React, { ReactNode } from "react";
import Button from "./Button";
import * as Form from "@radix-ui/react-form";

type SubmitProps = {
    isLoading?: boolean;
} & Form.FormSubmitProps &
    React.RefAttributes<HTMLButtonElement>;

const Submit = ({ isLoading, children, disabled, ...props }: SubmitProps) => {
    return (
        <Form.Submit asChild {...props}>
            <Button type="filled" isLoading={isLoading} buttonProps={{disabled: disabled}}>
                {children}
            </Button>
        </Form.Submit>
    );
};

export default Submit;
