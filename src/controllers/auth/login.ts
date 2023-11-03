import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/user.model';

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
      });
    }

    return res.json({
      error: false,
      data: {
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
      },
      message: '',
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default login;
