import { z } from "zod";
import { TrasactionType } from "../entities/trasations.entity";

export const createTransactionsSchema = {
    title: z.string(),
    amount: z.number().int().positive,
    type: z.nativeEnum(TrasactionType),
    data: z.coerce.date(),
    categoryId: z.string()
}