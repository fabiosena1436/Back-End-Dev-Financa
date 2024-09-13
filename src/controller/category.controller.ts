import { NextFunction, Request, Response } from 'express';


import { CategoriesServices } from '../services/categories.service';
import { CreateCategoyDTO } from '../dtos/categories.dto';
import { StatusCodes } from 'http-status-codes';

export class CategoriesController {
  constructor(private catecoriesSevices: CategoriesServices) {

  }

  create = async (
    req: Request<unknown, unknown, CreateCategoyDTO>,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      const { color, title } = req.body;
      const result = await this.catecoriesSevices.create({ color, title });

      return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
      next(err);
    }
  }

  index = async (
    _: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {


      const result = await this.catecoriesSevices.index();

      return res.status(StatusCodes.OK).json(result);
    } catch (err) {
      next(err);
    }
  }
}
