import { NextFunction, Request, Response } from 'express';

import { CategoriesRepository } from '../database/repositories/categories.repositories';
import { CategoryModel } from '../database/schemas/category.schema';
import { CategoriesServices } from './../services/categories.services';
import { CreateCategoyDTO } from '../dtos/categories.dto';
import { z } from 'zod';

export class CategoriesController {
  async create(
    req: Request<unknown, unknown, CreateCategoyDTO>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      

  

      const { color, title } = req.body;

      const respository = new CategoriesRepository(CategoryModel);
      const service = new CategoriesServices(respository);

      const result = await service.create({ color, title });

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
