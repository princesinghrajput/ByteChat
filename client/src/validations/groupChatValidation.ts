import {z} from "zod"

export const createChatSchema = z.object({
    title: z.string().min(3, {message: "Title must be at least 3 characters long"}).max(191, {message: "Title must be at most 191 characters long"}),
    passcode: z.string().min(4, {message: "Passcode must be at least 4 characters long"}).max(25, {message: "Passcode must be at most 25 characters long"}),
}).required()

export type CreateChatSchema = z.infer<typeof createChatSchema>

export const editChatSchema = z.object({
    title: z.string().min(3, {message: "Title must be at least 3 characters long"}).max(191, {message: "Title must be at most 191 characters long"}),
    passcode: z.string().min(4, {message: "Passcode must be at least 4 characters long"}).max(25, {message: "Passcode must be at most 25 characters long"}),
}).required()

export type EditChatSchema = z.infer<typeof editChatSchema>
