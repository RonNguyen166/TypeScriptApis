export default class ApiError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;
  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true,
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
