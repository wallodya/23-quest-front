import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string(),
    // text: z.string(),
    isTimer: z.boolean(),
    isPeriodic: z.boolean(),
    isRepeat: z.boolean(),
    // startTime: z.string(),
    // endTime: z.number(),
    // duration: z.number(),
    // repeatTimes: z.number(),
    // priority: z.string(),
    // difficulty: z.string(),
})