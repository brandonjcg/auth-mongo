import { Request, Response } from 'express';
import User from '../../models/user.model';
import { errorResponse, successResponse } from '../../utils';

const readUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find({}, 'username email');

    return successResponse(res, {
      data: users,
    });
  } catch (err: any) {
    return errorResponse(
      res,
      { message: `Error: ${err.message}` },
    );
  }
};

export default readUsers;
