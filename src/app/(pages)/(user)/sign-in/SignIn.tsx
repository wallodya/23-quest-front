"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { SignInBody } from "../../../../common/utils/server/api.types";
import { useSignInMutation } from "../../../../store/api/api.slice";

const SignInSchema = z.object({
    login: z.string().min(4, {message: "Login should be at lest 4 letters"}).max(20),
    password: z.string().min(4, {message: "Password should be at lest 4 letters"}).max(20)
})

const SignIn = () => {
    const [
        signIn,
        {
            isLoading: isMutationLoading,
            isSuccess: isAuthSuccess,
            isError: isMutationError,
            error: mutationError,
        },
    ] = useSignInMutation();

    const {
        handleSubmit,
        control,
        formState: {
            errors: { login: loginFieldError, password: passwordFieldError },
        },
    } = useForm<SignInBody>({
        resolver: zodResolver(SignInSchema),
    });

    const router = useRouter();

    const [errorLabel, setErrorLabel] = useState<string>("")

    useEffect(() => {
        if (!mutationError) {
            setErrorLabel("")
            return
        }

        if (mutationError.statusCode === 503) {
            setErrorLabel("Internnal error")
        } else {
            setErrorLabel("Wrong login or pasword")
        }
    }, [isMutationError])

    useEffect(() => {
        if (isAuthSuccess) {
            router.push("/home")
        }
    }, [isAuthSuccess])

    const onSubmit: SubmitHandler<SignInBody> = (data) => {
        signIn(data)
    };

    return (
        <div className="flex justify-center">
            <form className="flex flex-col gap-4 ">
                <Typography
                    variant="h4"
                    component={"h1"}
                    className={"mb-4 font-bold"}
                >
                    Sign in
                </Typography>
                <Controller
                    name="login"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label={"Login"}
                            autoFocus={true}
                            inputProps={{
                                "aria-autocomplete": "none",
                            }}
                            variant={"outlined"}
                            onChange={onChange}
                            value={value ?? ""}
                            error={!!loginFieldError}
                            helperText={loginFieldError?.message}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label={"Password"}
                            inputProps={{
                                "aria-autocomplete": "none",
                            }}
                            variant={"outlined"}
                            onChange={onChange}
                            type={"password"}
                            value={value ?? ""}
                            error={!!passwordFieldError}
                            helperText={passwordFieldError?.message}
                        />
                    )}
                />

                <LoadingButton
                    loading={isMutationLoading}
                    variant="contained"
                    color="primary"
                    className="bg-sky-500 py-2"
                    onClick={handleSubmit(onSubmit)}
                >
                    Sign in
                </LoadingButton>
                {
                    mutationError
                    &&
                    <Typography variant="caption" component="span" color="error">
                        {errorLabel}
                    </Typography>
                }
                <Button
                    variant="text"
                    color="primary"
                    size={"small"}
                    className="py-2"
                >
                    <Link href={"/sign-up"}>Create an account</Link>
                </Button>
            </form>
        </div>
    );
};

export default SignIn;
