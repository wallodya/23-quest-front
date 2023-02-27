"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import {
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUpMutation } from "../../../../store/api/api.slice";
import { isServerErrorData } from "../../../../types/error.types";

const CreateAccountSchema = z
    .object({
        login: z
            .string()
            .min(4, { message: "Login is too short" })
            .max(20, { message: "Login can't be longer than 20 letters" }),
        email: z.string().email({ message: "E-mail is not valid" }),
        password: z
            .string()
            .min(4, { message: "Password is too short" })
            .max(20, { message: "Password can't be longer than 20 letters" }),
        confirmPassword: z.string().min(4).max(20),
        terms: z.literal(true, {
            errorMap: () => ({
                message: "You must accept terms and conditions",
            }),
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords don't match",
    });

export type CreateAccountT = z.infer<typeof CreateAccountSchema>;

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
        resolver: zodResolver(CreateAccountSchema),
    });

    const [
        signIn,
        {
            isLoading,
            isSuccess,
            error: mutationError,
            isError: isMutationError,
        },
    ] = useSignUpMutation();

    const [errorField, setErrorField] = useState<string>("");

    const onSubmit: SubmitHandler<CreateAccountT> = (data) => {
        signIn(data);
    };

    useEffect(() => {
        if (!isMutationError && !termsFieldError) {
            setErrorField("");
            return;
        }

        if (termsFieldError?.message) {
            setErrorField(termsFieldError.message);
        } else if (isMutationError && mutationError) {
            isServerErrorData(mutationError)
                ? setErrorField(mutationError.message)
                : setErrorField("Internal error");
        }
    }, [isMutationError, termsFieldError]);

    return (
        <div className="flex justify-center">
            <form className="flex flex-col gap-4 ">
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
                    loading={isLoading}
                    variant={"contained"}
                    color={"primary"}
                    className={"bg-sky-500 py-2"}
                    onClick={handleSubmit(onSubmit)}
                >
                    Create
                </LoadingButton>
                {(termsFieldError || isMutationError) && (
                    <Typography
                        component={"span"}
                        variant={"caption"}
                        color={"error"}
                    >
                        {errorField}
                    </Typography>
                )}
            </form>
        </div>
    );
};

export default SignUp;
