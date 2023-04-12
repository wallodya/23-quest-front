import { z } from "zod";

export const newQuestSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title should contain from 1 to 20 characters" })
        .max(20, {
            message: "Title should contain from 1 to 20 characters",
        }),
    description: z
        .string()
        .max(140, {
            message: "Description can contain at most 140 characters",
        })
        .optional(),
});
