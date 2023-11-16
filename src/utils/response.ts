import { Response } from 'express';
import { HTTP_CODES } from '../constants';

export interface ResponseConfig {
  data?: any;
  message?: string;
  error?: boolean;
}

export const successResponse = (
  res: Response,
  config: ResponseConfig,
  status: number = HTTP_CODES.OK,
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
  status: number = HTTP_CODES.SERVER_ERROR,
) => {
  const { data, message } = config;

  return res.status(status).json({
    error: true,
    data: data ?? {},
    message: message ?? '',
  });
};
