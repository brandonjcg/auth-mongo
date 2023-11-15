import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return errorResponse(
        res,
        { message: 'Missing authorization header' },
        401,
      );
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      return errorResponse(
        res,
        { message: 'Missing token' },
        401,
      );
    }

    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));

    if (!decoded) {
      return errorResponse(
        res,
        { message: 'Invalid token' },
        401,
      );
    }

    return next();
  } catch (err: any) {
    return errorResponse(
      res,
      { message: `Token error: ${err.message}` },
      401,
    );
  }
};

export default checkAuth;
