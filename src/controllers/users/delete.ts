import { Request, Response } from 'express';
import User from '../../models/user.model';
import { errorResponse, successResponse } from '../../utils';

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    if (!user) {
      return errorResponse(
        res,
        { message: 'User not found' },
        404,
      );
    }

    return successResponse(res, {
      data: user,
      message: 'User deleted successfully',
    });
  } catch (err: any) {
    return errorResponse(
      res,
      { message: `Error: ${err.message}` },
    );
  }
};

export default deleteUser;
