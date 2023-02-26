"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { SignInBody } from "../../../../common/utils/server/api.types";
import { apiSlice, useSignInMutation } from "../../../../store/api/api.slice";
// import { signIn } from "../../../../store/auth/auth.thunk";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

const SignInSchema = z.object({
    login: z.string().min(4, {message: "Should be at lest 4"}).max(20),
    password: z.string().min(4, {message: "Should be at lest 4"}).max(20)
})

const SignIn = () => {
    const [ signIn, { isLoading, isSuccess } ] = useSignInMutation()

    const { handleSubmit, control, formState: { errors } } = useForm<SignInBody>({
        resolver: zodResolver(SignInSchema)
    });

    const onSubmit: SubmitHandler<SignInBody> = (data) => {
        signIn(data)
            .unwrap()
            .then((payload) => {
                if (isSuccess) {
                    alert("Success")
                } else {
                    alert("Fail")
                }
            })
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
                                "aria-autocomplete": "none"
                            }}
                            variant={"outlined"}
                            onChange={onChange}
                            value={value ?? ""}
                            error={!!errors.login}
                            helperText={errors.login?.message}
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
                                "aria-autocomplete": "none"
                            }}
                            variant={"outlined"}
                            onChange={onChange}
                            type={"password"}
                            value={value ?? ""}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    )}
                />

                <LoadingButton
                    loading={isLoading}
                    variant="contained"
                    color="primary"
                    className="bg-sky-500 py-2"
                    onClick={handleSubmit(onSubmit)}
                >
                    Sign in
                </LoadingButton>
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
