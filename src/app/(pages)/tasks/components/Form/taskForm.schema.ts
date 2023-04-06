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
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        duration: z
            .string()
            .transform((value) => Number(value) * 60 * 1000)
            .pipe(
                z
                    .number()
                    .min(60 * 1000, {
                        message: "Duration should be at least 1 minute",
                    }),
            )
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
        const { isTimer, duration } = data;
        if (!isTimer) {
            return true;
        }
        if (duration === undefined) {
            return false;
        }
        const isDurationValid = duration >= 1000 * 60 && duration % 1000 === 0;
        return isDurationValid;
    })
    // .refine(
    //     data => {
    //         console.log(data)
    //         return true
    //     }
    // );
