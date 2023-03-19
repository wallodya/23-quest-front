"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSignUpMutation } from "../../../../store/api/api.slice";
import { isServerErrorData } from "../../../../types/error.types";
import { CreateAccountT, SignUpSchema } from "./signUp.schema";
import { useSignUp } from "./useSignUp.hook";

const SignUp = () => {
    const {
        handleSubmit,
        control,
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

    return (
        <div className="flex justify-center">
            <form className="w-64 flex flex-col gap-4 transition-all">
                <Typography
                    variant="h4"
                    component="h1"
                    className="mb-4 font-bold"
                >
                    Create
                    <br />
                    account
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
                            value={value ?? ""}
                            onChange={onChange}
                            error={!!loginFieldError}
                            helperText={loginFieldError?.message}
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label={"E-mail"}
                            type={"email"}
                            inputProps={{
                                "aria-autocomplete": "none",
                            }}
                            value={value ?? ""}
                            onChange={onChange}
                            error={!!emailFieldError}
                            helperText={emailFieldError?.message}
                        />
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label={"Password"}
                            type={"password"}
                            inputProps={{
                                "aria-autocomplete": "none",
                            }}
                            value={value ?? ""}
                            onChange={onChange}
                            error={!!passwordFieldError}
                            helperText={passwordFieldError?.message}
                            fullWidth
                        />
                    )}
                />
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            label={"Confirm password"}
                            type={"password"}
                            inputProps={{
                                "aria-autocomplete": "none",
                            }}
                            value={value ?? ""}
                            onChange={onChange}
                            error={!!confirmPasswordFieldError}
                            helperText={confirmPasswordFieldError?.message}
                        />
                    )}
                />
                <FormControlLabel
                    label={"I agree with terms and conditions"}
                    className="text-slate-300"
                    control={
                        <Controller
                            name={"terms"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Checkbox onChange={onChange} value={value} />
                            )}
                        />
                    }
                />
                <LoadingButton
                    loading={isMutationLoading}
                    variant={"contained"}
                    color={"primary"}
                    className={"bg-sky-500 py-2"}
                    onClick={handleSubmit(onSubmit)}
                >
                    Create
                </LoadingButton>
                <BottomErrorLabel/>
            </form>
        </div>
    );
};

export default SignUp;
