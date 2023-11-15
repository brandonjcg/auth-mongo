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

export const errorResponse = (
  res: Response,
  config: ResponseConfig,
  status: number = 500,
) => {
  const { data, message } = config;

  return res.status(status).json({
    error: true,
    data: data ?? {},
    message: message ?? '',
  });
};
