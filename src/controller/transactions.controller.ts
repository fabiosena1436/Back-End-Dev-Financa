import { BodyRequest, QueryRequest } from './types';
import { NextFunction, Request, Response } from 'express';


import { StatusCodes } from 'http-status-codes';
import { TransactionsService } from '../services/trasactions.service';
import { CreateTransactionDTO, GetDashBoarDTO, GetFinancialEvolutionDTO, indexTransactionsDTO } from '../dtos/trasactions.dto';

export class TransactionsController {
  constructor(private transactionsSevices: TransactionsService) {

  }

  create = async (
    req: BodyRequest<CreateTransactionDTO>,
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



  index = async (
    req: QueryRequest<indexTransactionsDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { title, categoryId, beginDate, endDate } = req.query
      const result = await this.transactionsSevices.index({
        title,
        categoryId,
        beginDate,
        endDate
      });

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  getDashboard = async (
    req: QueryRequest< GetDashBoarDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { beginDate, endDate } = req.query
      const result = await this.transactionsSevices.getDashboard({

        beginDate,
        endDate
      });

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }

  getFinancialEvolution = async (
    req: QueryRequest< GetFinancialEvolutionDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { year } = req.query
      const result = await this.transactionsSevices.gerFinanceialEvolution({

        year,
      });

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }
}



