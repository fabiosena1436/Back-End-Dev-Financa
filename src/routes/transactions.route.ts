import { createTransactionSchema, IndexTransactionsSchema, getDaschboardSchema } from './../dtos/trasactions.dto';
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
        type: ParamnsType.BODY
    }),

    controller.index
);

transactionRoutes.get(
    '/dashboard',
    validator({
        schema: getDaschboardSchema,
        type: ParamnsType.BODY
    }),

    controller.getDashboard,
);