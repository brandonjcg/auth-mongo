import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/user.model';

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(409).json({
        message: 'Email ya registrado',
        error: true,
        data: {},
      });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username,
      email,
      password,
    });
    const savedUser = await user.save();

    return res.json({
      error: false,
      data: savedUser,
      message: 'User created successfully',
    });
  } catch (err: any) {
    return res.status(500).json({
      message: `Error: ${err.message}`,
      error: err,
      data: {},
    });
  }
};

export default createUser;
