import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string(),
    text: z.string(),
    type : z.string(),
    startTime: z.string(),
    endTime: z.number(),
    duration: z.number(),
    repeatTimes: z.number(),
    priority: z.string(),
    difficulty: z.string(),
})