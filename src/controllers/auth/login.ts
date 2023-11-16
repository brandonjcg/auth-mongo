import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user.model';
import { errorResponse, successResponse } from '../../utils';
import { HTTP_CODES } from '../../constants';

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return errorResponse(
        res,
        { message: 'User not found' },
        HTTP_CODES.NOT_FOUND,
      );
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return errorResponse(
        res,
        { message: 'The password is incorrect' },
        HTTP_CODES.UNAUTHORIZED,
      );
    }

    const payload = {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
    };

    const token = jwt.sign(
      payload,
      String(process.env.JWT_SECRET),
      { expiresIn: '1d' },
    );

    return successResponse(res, {
      data: {
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        token,
      },
    });
  } catch (error: any) {
    return errorResponse(
      res,
      { message: `Error: ${error.message}` },
    );
  }
};

export default login;
