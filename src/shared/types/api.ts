import { AxiosError } from "axios";

export type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
  timestamp?: string;
};

export type ApiError = AxiosError<ApiErrorResponse>;
