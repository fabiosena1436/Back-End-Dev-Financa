import { z } from "zod";
import { TransactionType } from "../entities/trasations.entity";

export const createTransactionSchema = {
    title: z.string(),
    amount: z.number().int().positive(),
    type: z.nativeEnum(TransactionType),
    date: z.coerce.date(),
    categoryId: z.string().length(24)
}

const createTransacionObject = z.object(createTransactionSchema)
export type CreateTransactionDTO = z.infer<typeof createTransacionObject>