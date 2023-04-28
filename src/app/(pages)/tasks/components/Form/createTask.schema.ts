import { z } from "zod";

const refineTimer = (data: {
    isTimer: boolean;
    durationHours?: number;
    durationMinutes?: number;
    durationSeconds?: number;
}) => {
    const { isTimer, durationHours, durationSeconds, durationMinutes } = data;
    // console.log("refine timer")
    if (!isTimer) {
        const hasDefinedDurationFields = [
            durationSeconds,
            durationMinutes,
            durationHours,
        ].some((value) => value !== undefined);
        return !hasDefinedDurationFields;
    } else {
        // console.log("dh: ", durationHours)
        // console.log("dm: ", durationMinutes)
        // console.log("ds: ", durationSeconds)
        if (
            durationHours === undefined ||
            durationMinutes === undefined ||
            durationSeconds === undefined ||
            [durationSeconds, durationMinutes, durationHours].every(
                (value) => value === 0,
            )
        ) {
            return false;
        }
        const totalDurationSeconds =
            durationHours * 60 * 60 + durationMinutes * 60 + durationSeconds;
        const isDurationValid =
            totalDurationSeconds >= 30 && totalDurationSeconds <= 24 * 60 * 60;
            // console.log('isDurationValid', isDurationValid)
        return isDurationValid;
    }
};

const refinePeriodic = (data: {
    isPeriodic: boolean;
    startTime?: string;
    endTime?: string;
}) => {
    const { isPeriodic, startTime, endTime } = data;
    if (!isPeriodic) {
        const hasDefinedPeriodFields =
            startTime !== undefined || endTime !== undefined;
        return !hasDefinedPeriodFields;
    } else {
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
    }
};

const refineRepeat = (data: { isRepeat: boolean; repeatCount?: number }) => {
    const { isRepeat, repeatCount } = data;
    const hasDefinedRepeatCount = repeatCount !== undefined;
    if (!isRepeat) {
        return !hasDefinedRepeatCount;
    } else {
        return hasDefinedRepeatCount;
    }
};

const preprocessEmptyString = (arg: unknown) => (arg === "" ? undefined : arg);

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
        priority: z
            .enum(["NOT_IMPORTANT", "MEDIUM", "URGENT"])
            .default("NOT_IMPORTANT"),
        startTime: z.preprocess(preprocessEmptyString, z.string().optional()),
        endTime: z.preprocess(preprocessEmptyString, z.string().optional()),
        durationHours: z.preprocess(
            preprocessEmptyString,
            z.coerce
                .number()
                .min(0, { message: "You cannot set negative duration" })
                .max(24, {
                    message: "You cannot set more than 24 hours",
                })
                .optional(),
        ),
        durationMinutes: z.preprocess(
            preprocessEmptyString,
            z.coerce
                .number()
                .min(0, { message: "You cannot set negative duration" })
                .max(59, {
                    message: "You cannot set more than 59 minutes",
                })
                .optional(),
        ),
        durationSeconds: z.preprocess(
            preprocessEmptyString,
            z.coerce
                .number()

                .min(0, { message: "You cannot set negative duration" })
                .max(59, {
                    message: "You cannot set more than 59 seconds",
                })
                .optional(),
        ),
        repeatCount: z.preprocess(
            preprocessEmptyString,
            z
                .string()
                .transform((value) => Number(value))
                .pipe(
                    z
                        .number()
                        .min(2, {
                            message: "You need to set at least two repetitions",
                        })
                        .max(200, "You cannot set more than 200 repititions"),
                )
                .default("5")
                .optional(),
        ),
    })
    .refine(refineRepeat, { message: "You must provide number of repeats" })
    .refine(refinePeriodic, { message: "Time period is not valid" })
    .refine(refineTimer, "Duration wasn't provided");

export type CreateTaskSchemaT = z.infer<typeof createTaskSchema>
