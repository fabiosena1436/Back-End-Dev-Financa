import { CategoriesRepository } from '../database/repositories/categories.repositories';
import { CategoryModel } from '../database/schemas/category.schema';
import { CategoriesServices } from './../services/categories.services';

import { Request, Response } from 'express';

export class CategoriesController {
  async create(_: Request, res: Response) {
   const respository = new CategoriesRepository(CategoryModel)
   const service = new CategoriesServices(respository)

    const result = await service.create();

    return res.status(201).json(result);
  }
}
