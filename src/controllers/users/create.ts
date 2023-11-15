import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/user.model';
import { errorResponse, successResponse } from '../../utils';

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return errorResponse(
        res,
        { message: 'Email already exists' },
        409,
      );
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username,
      email,
      password,
    });
    const savedUser = await user.save();

    return successResponse(
      res,
      {
        data: savedUser,
        message: 'User created successfully',
      },
      201,
    );
  } catch (err: any) {
    return errorResponse(
      res,
      { message: `Error: ${err.message}` },
    );
  }
};

export default createUser;
