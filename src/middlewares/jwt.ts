import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils';
import { HTTP_CODES } from '../constants';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return errorResponse(
        res,
        { message: 'Missing authorization header' },
        HTTP_CODES.UNAUTHORIZED,
      );
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      return errorResponse(
        res,
        { message: 'Missing token' },
        HTTP_CODES.UNAUTHORIZED,
      );
    }

    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));

    if (!decoded) {
      return errorResponse(
        res,
        { message: 'Invalid token' },
        HTTP_CODES.UNAUTHORIZED,
      );
    }

    return next();
  } catch (err: any) {
    return errorResponse(
      res,
      { message: `Token error: ${err.message}` },
      HTTP_CODES.UNAUTHORIZED,
    );
  }
};

export default checkAuth;
