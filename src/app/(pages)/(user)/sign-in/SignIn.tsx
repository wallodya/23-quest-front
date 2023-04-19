"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { SignInBody } from "common/utils/server/api.types";
import { useSignIn } from "./useSignIn.hook";
import * as Form from "@radix-ui/react-form";
import FormWrapper from "components/ui/FormWrapper";
import Button from "components/ui/Button";
import InputField, { InputFieldProps } from "components/ui/InputField";
import Submit from "components/ui/Submit";
import Divider from "components/ui/Divider";
import Heading from "components/ui/typography/Heading";
import { useRouter } from "next/navigation";
import { useAppSelector } from "store";
import { useEffect } from "react";

const SignInSchema = z.object({
    login: z
        .string()
        .min(4, { message: "Login should be at lest 4 letters" })
        .max(20),
    password: z
        .string()
        .min(4, { message: "Password should be at lest 4 letters" })
        .max(20),
});

const SignIn = () => {
    const {
        handleSubmit,
        register,
        formState: {
            errors: { login: loginFieldError, password: passwordFieldError },
        },
    } = useForm<SignInBody>({
        resolver: zodResolver(SignInSchema),
    });

    const router = useRouter()
    const { isSignedIn } = useAppSelector(state => state.user)

    useEffect(() => {
        if (isSignedIn) {
            router.replace("/tasks")
        }
    },[isSignedIn])

    const {
        onSubmit,
        BottomErrorLabel,
        mutation: { isLoading: isMutationLoading, error: mutationError },
    } = useSignIn({
        onSuccess: () => {
            router.refresh()
            router.replace("/tasks")
            console.log("refreshing the page")
        }   
    });

    const formFields: InputFieldProps[] = [
        {
            labelText: "Login",
            fieldName: "login",
            registerFn: register,
            inputError: loginFieldError,
            required: true
        },
        {
            labelText: "Password",
            fieldName: "password",
            registerFn: register,
            type: "password",
            inputError: passwordFieldError,
            required: true
        },
    ];

    return (
        <div className="absolute inset-0 w-fit h-fit m-auto">
            <FormWrapper
                className="flex w-64 flex-col gap-4"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Heading level={1} className="font-bold text-4xl">Sign in</Heading>
                <Divider type="space"/>
                {formFields.map((field, index) => (
                    <InputField {...field} key={index} />
                ))}
                <Divider type="space"/>
                <Submit isLoading={isMutationLoading}>Sign in</Submit>
                <BottomErrorLabel />
                <Button type="text">
                    <Link href={"/sign-up"}>Create an account</Link>
                </Button>
            </FormWrapper>
        </div>
    );
};

export default SignIn;
