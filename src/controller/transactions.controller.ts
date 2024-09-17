import { NextFunction, Request, Response } from 'express';


import { StatusCodes } from 'http-status-codes';
import { TransactionsService } from '../services/trasactions.service';
import { CreateTransactionDTO, GetDashBoarDTO, indexTransactionsDTO } from '../dtos/trasactions.dto';

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


  
  index = async (
    req: Request<unknown, unknown, unknown, indexTransactionsDTO>,
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
    req: Request<unknown, unknown, unknown, GetDashBoarDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {  beginDate, endDate } = req.query
      const result = await this.transactionsSevices.getDashboard({ 
        
        beginDate, 
        endDate 
      });
  
      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }
}



