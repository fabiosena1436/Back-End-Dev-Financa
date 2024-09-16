import { Router } from 'express';
import { createCtegorySchema } from './../dtos/categories.dto';
import { CategoriesController } from '../controller/category.controller';
import { ParamnsType, validator } from '../middlewares/validetor.middleware';
import { CategoriesFactory } from '../factories/categories.factory';

export const categoriesRoutes = Router();

const controller = new CategoriesController(CategoriesFactory.getServiceInstance());

categoriesRoutes.get('/', controller.index)

categoriesRoutes.post(
    '/', 
    validator({
    schema: createCtegorySchema,
    type: ParamnsType.BODY
}) ,

controller.create,
);


