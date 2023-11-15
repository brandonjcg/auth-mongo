import { Response } from 'express';

export interface ResponseConfig {
  data?: any;
  message?: string;
  error?: boolean;
}

export const successResponse = (
  res: Response,
  config: ResponseConfig,
  status: number = 200,
) => {
  const { data, message } = config;

  return res.status(status).json({
    error: false,
    data: data ?? {},
    message: message ?? '',
  });
};
