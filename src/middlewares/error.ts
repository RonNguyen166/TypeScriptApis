import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ApiError from "../utils/AppError";

function errorConverter(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  let error: any = err;
  if (!(error instanceof ApiError)) {
    const statusCode: number =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message: string = err.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
}

function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { statusCode, message, status } = err;
  if (process.env.NODE_ENV !== "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus["500_MESSAGE"];
  }
  res.locals.errorMessage = message;
  const response = {
    code: statusCode,
    status: status,
    message: message,
    ...(process.env.NODE_ENV !== "development" && { stack: err.stack }),
  };
  if (process.env.NODE_ENV !== "development") {
    console.log(err);
  }
  return res.status(statusCode).json(response);
}

export { errorHandler, errorConverter };
