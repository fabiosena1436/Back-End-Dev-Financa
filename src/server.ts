import 'dotenv/config';
import express, { json } from 'express';
import { routes } from './routes';
import { setupMongo } from './dtos';
import { errorHandler } from './middlewares/error-handdler.middleware';

setupMongo().then(() => {
  const app = express()

  app.use(json());
  app.use(routes);
  app.use(errorHandler);

  app.listen(3333, () => console.log('App is running at port 3333!'));
});
