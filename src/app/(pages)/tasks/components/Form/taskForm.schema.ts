import { z } from "zod";

export const createTaskSchema = z
    .object({
        title: z
            .string()
            .min(1, { message: "Title should contain from 1 to 20 characters" })
            .max(20, {
                message: "Title should contain from 1 to 20 characters",
            }),
        text: z
            .string()
            .max(140, {
                message: "Description can contain at most 140 characters",
            })
            .optional(),
        isTimer: z.boolean(),
        isPeriodic: z.boolean(),
        isRepeat: z.boolean(),
        priority: z.string(),
        startTime: z
            .string()
            .transform((value) => Number(new Date(value)))
            .pipe(
                z.number().min(Number(new Date()), {
                    message: "Start time can't be earlier than current time",
                }),
            )
            .optional(),
        endTime: z
            .string()
            .transform((value) => Number(new Date(value)))
            .pipe(
                z.number().min(Number(new Date()), {
                    message: "End time can't be earlier than current time",
                }),
            )
            .optional(),
        duration: z
            .string()
            .transform((value) => Number(value) * 60 * 1000)
            .pipe(z.number().min(1, { message: "Duration should be at least 1 minute"}))
            .optional(),
        repeatCount: z
            .string()
            .transform((value) => Number(value))
            .pipe(
                z.number().min(2, {
                    message: "You need to set at least two repetitions",
                }),
            )
            .optional(),
    })
    .refine(
        (data) =>
            (data.endTime === undefined && data.startTime === undefined) ||
            (data.startTime && data.endTime && data.endTime > data.startTime),
        {
            path: ["endTime"],
            message : "End can't be earlier than start time"
        }
    );
