
import { createCtegorySchema } from './../dtos/categories.dto';
import { Router } from 'express';

import { CategoriesController } from '../controller/category.controller';
import { ParamnsType, validator } from '../middlewares/validetor.middleware';

export const categoriesRoutes = Router();

const controller = new CategoriesController();

categoriesRoutes.post(
    '/', 
    validator({
    schema: createCtegorySchema,
    type: ParamnsType.BODY
}) ,

controller.create,
);
