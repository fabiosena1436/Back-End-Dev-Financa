import { StatusCodes } from 'http-status-codes';
import { AppError } from './../errors/app.errors';
import { NextFunction, Request, Response } from 'express';
import { ZodRawShape, z } from 'zod';

export enum ParamnsType {
  QUERY = 'query',
  BODY = 'body',
}

type validateParams = {
  schema: ZodRawShape;
  type: ParamnsType;
};

export function validator(params: validateParams) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = z.object(params.schema).safeParse(req[params.type]);

    if(!result.success){
      const errorFormatted = result.error.issues.map(
        (item)=>`${item.path.join('.')}: ${item.message}`,
      )
      throw new AppError(errorFormatted, StatusCodes.UNPROCESSABLE_ENTITY)
    }

    req[params.type] = result.data

    next()
  };
}
