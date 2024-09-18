import { createTransactionSchema, IndexTransactionsSchema, getDaschboardSchema, getFinanceEvolutionSchema } from './../dtos/trasactions.dto';
import { TransactionsController } from './../controller/transactions.controller';
import { Router } from 'express';
import { ParamnsType, validator } from '../middlewares/validetor.middleware';
import { TransactionsFactory } from '../factories/transaction.factoriey';


export const transactionRoutes = Router();

const controller = new TransactionsController(TransactionsFactory.getServiceInstance());


transactionRoutes.post(
    '/',
    validator({
        schema: createTransactionSchema,
        type: ParamnsType.BODY
    }),

    controller.create,
);


transactionRoutes.get('/',
    validator({
        schema: IndexTransactionsSchema,
        type: ParamnsType.QUERY
    }),

    controller.index
);

transactionRoutes.get(
    '/dashboard',
    validator({
        schema: getDaschboardSchema,
        type: ParamnsType.QUERY
    }),

    controller.getDashboard,
);

transactionRoutes.get(
    '/financial-evlution',
    validator({
        schema: getFinanceEvolutionSchema,
        type: ParamnsType.QUERY
    }),

    controller.getFinancialEvolution,
);