import { transactionRoutes } from './transactions.route';
import { Router } from 'express';
import { baseRoutes } from './base.router';
import { categoriesRoutes } from './categories.route';
export const routes = Router();

routes.use('/', baseRoutes);
routes.use('/categories', categoriesRoutes)
routes.use('/transactions', transactionRoutes)
