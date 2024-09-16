
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

export const IndexTransactionsSchema = {
    title: z.string().optional(),
    categoryId: z.string().length(24).optional(),
    beginDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    
}

const indexTransactionObject = z.object(IndexTransactionsSchema)
export type indexTransactionsDTO = z.infer<typeof indexTransactionObject>

export const getDaschboardSchema ={
    beginDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
}

const getDashboardObject = z.object(getDaschboardSchema)
export type GetDashBoarDTO = z.infer<typeof getDashboardObject>


