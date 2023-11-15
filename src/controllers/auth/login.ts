import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user.model';
import { successResponse } from '../../utils';

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
        error: true,
        data: {},
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'The password is incorrect',
        error: true,
        data: {},
      });
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
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default login;
