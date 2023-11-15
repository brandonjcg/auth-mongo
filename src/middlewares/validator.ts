import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils';

const validateSchema = (schema: any) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    errorResponse(
      res,
      { message: error.errors.map((item: any) => item.message) },
      409,
    );
  }
};

export default validateSchema;
