import { Request, Response } from "express";
import httpStatus from "http-status";
import User from "../models/user.model";
import ApiError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import pick from "../utils/pick";
import { Document } from "mongoose";

class UserController {
  public create = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      const user: Document = await User.create(req.body);
      return res.status(201).json({
        status: "success",
        data: user,
      });
    }
  );

  public getAll = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      const filter = pick(req.query, ["name", "amail", "role"]);
      const users: Document[] = await User.find(filter);
      return res.status(200).json({
        status: "success",
        data: users,
      });
    }
  );

  public getOne = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      const user: Document | null = await User.findById(req.params.userId);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }
  );

  public update = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      const user: Document | null = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
          new: true,
        }
      );
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }
  );

  public delete = catchAsync(
    async (req: Request, res: Response): Promise<Response | void> => {
      const user: Document | null = await User.findByIdAndDelete(
        req.params.userId
      );
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
      }
      return res.status(204).json({});
    }
  );
}
export default UserController;
