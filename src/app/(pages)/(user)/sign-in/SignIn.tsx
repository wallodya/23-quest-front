"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { SignInBody } from "../../../../common/utils/server/api.types";
import { useSignIn } from "./useSignIn.hook";

const SignInSchema = z.object({
    login: z.string().min(4, {message: "Login should be at lest 4 letters"}).max(20),
    password: z.string().min(4, {message: "Password should be at lest 4 letters"}).max(20)
})

const SignIn = () => {
    console.log("test2")
    const {
        handleSubmit,
        control,
        formState: {
            errors: { login: loginFieldError, password: passwordFieldError },
        },
    } = useForm<SignInBody>({
        resolver: zodResolver(SignInSchema),
    });

    const {
        onSubmit,
        BottomErrorLabel,
        mutation: { isLoading: isMutationLoading, error: mutationError },
    } = useSignIn({});

    return (
        <div className="flex justify-center">
            <form className="w-64 flex flex-col gap-4 ">
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
                <BottomErrorLabel/>
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
