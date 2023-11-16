import { NextFunction, Request, Response } from 'express';
import { errorResponse } from '../utils';
import { HTTP_CODES } from '../constants';

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
      HTTP_CODES.CONFLICT,
    );
  }
};

export default validateSchema;
