"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Button from "components/ui/Button";
import Divider from "components/ui/Divider";
import FormWrapper from "components/ui/FormWrapper";
import InputField, { InputFieldProps } from "components/ui/InputField";
import Submit from "components/ui/Submit";
import Heading from "components/ui/typography/Heading";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CreateAccountT, SignUpSchema } from "./signUp.schema";
import { useSignUp } from "./useSignUp.hook";
import { useAppSelector } from "store";
import { useEffect } from "react";

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

    const { isSignedIn } = useAppSelector(state => state.user)
    const router = useRouter()

    useEffect(() => {
        if (isSignedIn) {
            router.replace("/tasks")
        }
    })

    const {
        onSubmit,
        BottomErrorLabel,
        mutation: { isLoading: isMutationLoading, isError: isMutationError },
    } = useSignUp({
        termsFieldError,
        onSuccess: () => {
            router.replace("/tasks")
        }
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
            // required: true,
        },
    ]
  
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
            <FormWrapper
                className="h-fit flex w-64 flex-col gap-4 transition-all"
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
