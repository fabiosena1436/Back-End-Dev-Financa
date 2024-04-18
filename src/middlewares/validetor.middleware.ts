import { NextFunction } from 'express';
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
  };
}
