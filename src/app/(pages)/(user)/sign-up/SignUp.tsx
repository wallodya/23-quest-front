"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Button from "components/ui/Button";
import Divider from "components/ui/Divider";
import FormWrapper from "components/ui/FormWrapper";
import InputField, { InputFieldProps } from "components/ui/InputField";
import Submit from "components/ui/Submit";
import Heading from "components/ui/typography/Heading";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateAccountT, SignUpSchema } from "./signUp.schema";
import { useSignUp } from "./useSignUp.hook";

const SignUp = () => {
    const {
        handleSubmit,
        register,
        formState: {
            errors: {
                terms: termsFieldError,
                login: loginFieldError,
                password: passwordFieldError,
                confirmPassword: confirmPasswordFieldError,
                email: emailFieldError,
            },
        },
    } = useForm<CreateAccountT>({
        resolver: zodResolver(SignUpSchema),
    });

    const {
        onSubmit,
        BottomErrorLabel,
        mutation: { isLoading: isMutationLoading, isError: isMutationError },
    } = useSignUp({
        termsFieldError,
    });

    const formFields: InputFieldProps[] = [
        {
            fieldName: "login",
            labelText: "Login",
            inputError: loginFieldError,
            registerFn: register,
            required: true,
        },
        {
            fieldName: "email",
            labelText: "E-mail",
            inputError: emailFieldError,
            registerFn: register,
            type: "email",
            required: true,
        },
        {
            fieldName: "password",
            labelText: "Password",
            inputError: passwordFieldError,
            registerFn: register,
            type: "password",
            required: true,
        },
        {
            fieldName: "confirmPassword",
            labelText: "Confirm your password",
            inputError: confirmPasswordFieldError,
            registerFn: register,
            type: "password",
            required: true,
        },
        {
            fieldName: "terms",
            labelText: "I agree with terms and conditions",
            inputError: termsFieldError,
            registerFn: register,
            type: "checkbox",
            required: true,
        },
    ]
  
    return (
        <div className="flex justify-center">
            <FormWrapper
                className="flex w-64 flex-col gap-4 transition-all"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Heading level={1} className="font-bold text-4xl">
                    Create
                    <br />
                    account
                </Heading>
                <Divider type="space" />
                {formFields.map((field, index) => (
                    <InputField {...field} key={index} />
                ))}
                <Divider type="space" />
                <Submit isLoading={isMutationLoading}>Create</Submit>
                <Button type="text">
                    <Link href={"/sign-in"}>I already have an account</Link>
                </Button>
                <BottomErrorLabel />
            </FormWrapper>
        </div>
    );
};

export default SignUp;
