export interface IHttpError {
  error: ErrorContent;
}

export interface ErrorContent {
  errorContent: Error;
  message?: string;
  code?: number;
}
