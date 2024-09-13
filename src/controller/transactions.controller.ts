import { NextFunction, Request, Response } from 'express';


import { StatusCodes } from 'http-status-codes';
import { TransactionsService } from '../services/trasactions.service';
import { CreateTransactionDTO } from '../dtos/trasactions.dto';

export class TransactionsController {
  constructor(private transactionsSevices: TransactionsService) {

  }

  create = async (
    req: Request<unknown, unknown, CreateTransactionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      const { title, amount, categoryId, date, type } = req.body;
      const result = await this.transactionsSevices.create({
        title,
        amount,
        categoryId,
        date,
        type
      });

      return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }

}
