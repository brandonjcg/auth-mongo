import { Request, Response } from 'express';
import User from '../../models/user.model';

const readUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find({}, 'username email');

    return res.json({
      error: false,
      data: users,
      message: '',
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
