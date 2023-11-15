import { Request, Response } from 'express';
import User from '../../models/user.model';
import { successResponse } from '../../utils';

const readUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find({}, 'username email');

    return successResponse(res, {
      data: users,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: `Error: ${err.message}`,
      error: err,
      data: {},
    });
  }
};

export default readUsers;
