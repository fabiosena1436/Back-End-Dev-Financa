import { Router } from 'express';
import { baseRoutes } from './base.router';
import { categoiresRouter } from './categories.route';
export const routes = Router();

routes.use('/', baseRoutes);
routes.use('/categories', categoiresRouter)