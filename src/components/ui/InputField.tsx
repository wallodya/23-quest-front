import React from "react";
import * as Form from "@radix-ui/react-form";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import Input, { InputProps } from "./Input";
import Checkbox from "./Checkbox";

export type InputFieldProps = {
    inputError?: FieldError,
    labelText?: string,
    fieldName: string,
    isInline?: boolean
    registerFn: UseFormRegister<any>,
} & InputProps

const ErrorLabel = ({ error }: { error?: FieldError }) => {
    if (!error) {
        return null;
    }
    return (
        <Form.Message className="mt-2 block text-xs font-medium text-red-600 dark:text-red-400">
            <span>{error.message}</span>
        </Form.Message>
    );
};

const Label = ({ text }: { text?: string }) =>
    text ? (
        <Form.Label className="mb-2 block text-sm font-medium text-slate-800 dark:text-slate-100">
            {text}
        </Form.Label>
    ) : null;
    
const CheckboxLabel = ({ text }: { text?: string }) => (
    text ? (
        <Form.Label className="ml-2 text-sm font-medium text-slate-800 dark:text-slate-100">
            {text}
        </Form.Label>
    ) : null
);

const TextField = ({inputError, fieldName, labelText, registerFn, isInline, ...inputProps} : InputFieldProps) => (
    <Form.Field name={fieldName}>
        <div className={isInline ? "flex gap-2 items-center justify-between" : ""}>
        <Label text={labelText} />
        <Form.Control asChild>
            <Input {...inputProps} {...registerFn(fieldName)} />
        </Form.Control>
        </div>
        <ErrorLabel error={inputError} />
    </Form.Field>
);

const CheckBox = ({inputError, fieldName, labelText, registerFn, ...inputProps} : InputFieldProps) => (
    <Form.Field name={fieldName} className="flex items-center">
        <Form.Control asChild>
            <Checkbox {...inputProps} {...registerFn(fieldName)} />
        </Form.Control>
        <CheckboxLabel text={labelText} />
        <ErrorLabel error={inputError} />
    </Form.Field>
    
)

const InputField = (props: InputFieldProps) => {
    switch (props.type) {
        case "checkbox": {
            return <CheckBox {...props}/>
        }
        default: {
            return <TextField {...props}/>
        }
    }
};

export default InputField;
