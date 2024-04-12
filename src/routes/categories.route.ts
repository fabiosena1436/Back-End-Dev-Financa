import { Router } from 'express';

import { CategoriesController } from '../controller/category.controller';

export const categoiresRouter = Router();

const controller = new CategoriesController();

categoiresRouter.get('/', controller.create);
