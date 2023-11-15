import { Request, Response } from 'express';
import User from '../../models/user.model';
import { successResponse } from '../../utils';

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        data: {},
      });
    }

    return successResponse(res, {
      data: user,
      message: 'User deleted successfully',
    });
  } catch (err: any) {
    return res.status(500).json({
      message: `Error: ${err.message}`,
      error: err,
      data: {},
    });
  }
};

export default deleteUser;
