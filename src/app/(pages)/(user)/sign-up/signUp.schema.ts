import { z } from "zod";

const specialSymbols = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"

const hasLowerCaseRegex = new RegExp("^.*[a-z].*$")
const hasUpperCaseRegex = new RegExp("^.*[A-Z].*$")
const hasNumberRegex = new RegExp("^.*[0-9].*$")
const hasSpecialSymbols = new RegExp(`^.*[${specialSymbols}].*$`)

export const SignUpSchema = z
    .object({
        login: z
            .string()
            .min(4, { message: "Login is too short" })
            .max(20, { message: "Login can't be longer than 20 letters" }),
        email: z.string().email({ message: "E-mail is not valid" }),
        password: z
            .string()
            .min(4, { message: "Password is too short" })
            .max(20, { message: "Password can't be longer than 20 letters" })
            .regex(hasLowerCaseRegex, { message: "Password must include at least 1 lower case letter (a-z)" })
            .regex(hasUpperCaseRegex, { message: "Password must include at least 1 upper case letter (A-Z)'" })
            .regex(hasNumberRegex, { message: "Password must include at least 1 number (0-9)" }),
            // .regex(hasSpecialSymbols, { message: "Password must include at least 1 special symbols like '$', '%', etc." })
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
    })

export type CreateAccountT = z.infer<typeof SignUpSchema>;