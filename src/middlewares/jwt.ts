import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: 'Missing authorization header',
        error: true,
        data: {},
      });
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      return res.status(401).json({
        message: 'Missing token',
        error: true,
        data: {},
      });
    }

    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));

    if (!decoded) {
      return res.status(401).json({
        message: 'Invalid token',
        error: true,
        data: {},
      });
    }

    return next();
  } catch (err: any) {
    return res.status(401).json({
      message: `Token error: ${err.message}`,
      error: true,
      data: {},
    });
  }
};

export default checkAuth;
