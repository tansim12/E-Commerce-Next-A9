
export interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export type TResponseError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources?: { path: string; message: string }[];
    stack?: string;
  };
};
export type TResponse<T> = {
  data?: T;
  meta?: TMeta;
  error?: TResponseError;
  success?: boolean;
  message?: string;
};

