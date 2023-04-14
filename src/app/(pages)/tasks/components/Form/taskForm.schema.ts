import { z } from "zod";

const baseTaskSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title should contain from 1 to 20 characters" })
        .max(20, {
            message: "Title should contain from 1 to 20 characters",
        }),
    text: z
        .string()
        .max(200, {
            message: "Description can contain at most 200 characters",
        })
        .optional(),
    priority: z.string().default("NOT_IMPORTANT"),
});

const isTimerSchema = z.object({
    isTimer: z.literal(true),
    durationHours: z
        .string()
        .transform((value) => Number(value))
        .pipe(
            z
                .number()
                .min(0, { message: "You cannot set negative duration" })
                .max(24, { message: "You cannot set more than 24 hours" }),
        )
        .default("0"),
    durationMinutes: z
        .string()
        .transform((value) => Number(value))
        .pipe(
            z
                .number()
                .min(0, { message: "You cannot set negative duration" })
                .max(59, {
                    message: "You cannot set more than 59 minutes",
                }),
        )
        .default("1"),
    durationSeconds: z
        .string()
        // .min(0, { message: "You cannot set negative duration" })
        // .max(59)
        .transform((value) => Number(value))
        .pipe(
            z
                .number()
                .min(0, { message: "You cannot set negative duration" })
                .max(59, {
                    message: "You cannot set more than 59 seconds",
                }),
        )
        .default("0"),
});

const notIsTimerSchema = z.object({
    isTimer: z.literal(false),
    durationHours: z.literal(undefined),
    durationMinutes: z.literal(undefined),
    durationSeconds: z.literal(undefined),
});

const refineTimer = (data: {
    isTimer: boolean;
    durationHours?: number;
    durationMinutes?: number;
    durationSeconds?: number;
}) => {
    const { isTimer, durationHours, durationSeconds, durationMinutes } = data;
    if (!isTimer) {
        const hasDefinedDurationFields = [
            durationSeconds,
            durationMinutes,
            durationHours,
        ].some((value) => value !== undefined);
        return !hasDefinedDurationFields;
    } else {
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
        return isDurationValid;
    }
};

const timerTaskSchema = isTimerSchema.merge(notIsTimerSchema);

const isPeriodicSchema = z.object({
    isPeriodic: z.literal(true),
    startTime: z.string(),
    endTime: z.string(),
});

const notIsPeriodicSchema = z.object({
    isPeriodic: z.literal(false),
    startTime: z.literal(undefined),
    endTime: z.literal(undefined),
});

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

const periodicTaskSchema = notIsPeriodicSchema.merge(isPeriodicSchema);

const isRepeatSchema = z.object({
    isRepeat: z.literal(true),
    repeatCount: z
        .string()
        .transform((value) => Number(value))
        .pipe(
            z
                .number()
                .min(2, {
                    message: "You need to set at least two repetitions",
                })
                .max(200, {
                    message: "You cannot set more than 200 repetitions",
                }),
        )
        .default("5"),
});
const notIsRepeatSchema = z.object({
    isRepeat: z.literal(false),
    repeatCount: z.literal(undefined),
});

const refineRepeat = (data: { isRepeat: boolean; repeatCount?: number }) => {
    const { isRepeat, repeatCount } = data;
    const hasDefinedRepeatCount = repeatCount !== undefined;
    if (!isRepeat) {
        return !hasDefinedRepeatCount;
    } else {
        return hasDefinedRepeatCount;
    }
};

const repeatTaskSchema = notIsRepeatSchema.merge(isRepeatSchema);

export const createTaskSchemaA = baseTaskSchema
    .merge(repeatTaskSchema)
    .merge(timerTaskSchema)
    .merge(periodicTaskSchema)
    .refine(refineRepeat)
    .refine(refinePeriodic)
    .refine(refineTimer);

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
        priority: z.string().default("NOT_IMPORTANT"),
        startTime: z.preprocess(preprocessEmptyString, z.string().optional()),
        endTime: z.preprocess(preprocessEmptyString, z.string().optional()),
        durationHours: z.preprocess(
            preprocessEmptyString,
            z
                .string()
                .transform((value) => Number(value))
                .pipe(
                    z
                        .number()
                        .min(0, { message: "You cannot set negative duration" })
                        .max(24, {
                            message: "You cannot set more than 24 hours",
                        }),
                )
                .default("0")
                .optional(),
        ),
        durationMinutes: z.preprocess(
            preprocessEmptyString,
            z
                .string()
                .transform((value) => Number(value))
                .pipe(
                    z
                        .number()
                        .min(0, { message: "You cannot set negative duration" })
                        .max(59, {
                            message: "You cannot set more than 59 minutes",
                        }),
                )
                .default("1")
                .optional(),
        ),
        durationSeconds: z.preprocess(
            preprocessEmptyString,
            z
                .string()
                // .min(0, { message: "You cannot set negative duration" })
                // .max(59)
                .transform((value) => Number(value))
                .pipe(
                    z
                        .number()
                        .min(0, { message: "You cannot set negative duration" })
                        .max(59, {
                            message: "You cannot set more than 59 seconds",
                        }),
                )
                .default("0")
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
    .refine(refineTimer, { message: "Duration wasn't provided" });
