import { NextFunction, Request, Response } from 'express';

const validateSchema = (schema: any) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(409).json({
      message: error.errors.map((item: any) => item.message),
      error: true,
      data: {},
    });
  }
};

export default validateSchema;
