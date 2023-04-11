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
        isTimer: z.boolean().default(false),
        isPeriodic: z.boolean().default(false),
        isRepeat: z.boolean().default(false),
        priority: z.string().default("NOT_IMPORTANT"),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        // duration: z
        //     .string()
        //     .transform((value) => Number(value) * 60 * 1000)
        //     .pipe(
        //         z
        //             .number()
        //             .min(60 * 1000, {
        //                 message: "Duration should be at least 1 minute",
        //             }),
        //     )
        //     .optional(),
        durationHours: z
            .string()
            .transform((value) => Number(value))
            .pipe(
                z
                    .number()
                    .min(0, { message: "You cannot set negative duration" })
                    .max(24 , {message: "You cannot set more than 24 hours"})
            )
            .default("0")
            .optional(),
        durationMinutes: z
            .string()
            .transform((value) => Number(value))
            .pipe(
                z
                    .number()
                    .min(0, { message: "You cannot set negative duration" })
                    .max(59 , {message: "You cannot set more than 59 minutes"})
            )
            .default("1")
            .optional(),
        durationSeconds: z
            .string()
            // .min(0, { message: "You cannot set negative duration" })
            // .max(59)
            .transform((value) => Number(value))
            .pipe(
                z
                    .number()
                    .min(0, { message: "You cannot set negative duration" })
                    .max(59 , {message: "You cannot set more than 59 seconds"})
            )
            .default("0")
            .optional(),
        repeatCount: z
            .string()
            .transform((value) => Number(value))
            .pipe(
                z.number().min(2, {
                    message: "You need to set at least two repetitions",
                }),
            )
            .default("5")
            .optional(),
    })
    .refine(
        (data) => {
            const { isPeriodic, startTime, endTime } = data;
            if (!isPeriodic) {
                return true;
            }
            if (startTime === undefined || endTime === undefined) {
                return false;
            }
            const startMs = Number(new Date(startTime));
            const endMs = Number(new Date(endTime));
            const currentTimeMs = Number(new Date());
            const isStartTimeValid = startMs > currentTimeMs;
            const isEndTimeValid = endMs > currentTimeMs;
            const isPeriodValid = endMs > startMs;
            return isStartTimeValid && isEndTimeValid && isPeriodValid;
        },
        {
            path: ["endTime"],
            message: "Time period is not valid",
        },
    )
    .refine((data) => {
        const { isTimer, durationHours, durationSeconds, durationMinutes } = data;
        if (!isTimer) {
            return true;
        }
        if (
            [durationSeconds, durationMinutes, durationHours].every(
                (value) => value === 0,
            ) ||
            (durationHours === undefined || durationMinutes === undefined || durationSeconds === undefined)
        ) {
            return false;
        }
        const totalDurationSeconds = durationHours * 60 * 60 + durationMinutes * 60 + durationSeconds
        const isDurationValid = totalDurationSeconds >= 30 && totalDurationSeconds <= 24 * 60 * 60;
        return isDurationValid;
    })
    .refine((data) => {
        const { isRepeat, repeatCount } = data;
        if (!isRepeat) {
            return true;
        }
        if (!repeatCount) {
            return false;
        }
        return repeatCount < 200;
    });
