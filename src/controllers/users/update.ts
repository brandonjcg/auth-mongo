import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/user.model';
import { successResponse } from '../../utils';

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = {
      ...req.body,
      password,
    };
    const savedUser = await User.findOneAndUpdate(
      { id: req.params.id },
      user,
      { new: true },
    );

    return successResponse(res, {
      data: savedUser,
      message: 'User updated successfully',
    });
  } catch (err: any) {
    return res.status(500).json({
      message: `Error: ${err.message}`,
      error: err,
      data: {},
    });
  }
};

export default updateUser;
