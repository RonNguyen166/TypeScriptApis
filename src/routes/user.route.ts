import express from "express";
import IRoutes from "../interface/router.interface";
import userController from "../controllers/user.controller";
import {
  create,
  updateOne,
  deleteOne,
  getOne,
  getAll,
} from "../validations/user.validation";
import validate from "../middlewares/validate";

// const router = express.Router();
class UsserRoute implements IRoutes {
  public path = "/users";
  public router = express.Router();
  private userController = new userController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route(`${this.path}/:userId`)
      .get(validate(getOne), this.userController.getOne)
      .patch(validate(updateOne), this.userController.update)
      .delete(validate(deleteOne), this.userController.delete);

    this.router
      .route(`${this.path}/`)
      .get(validate(getAll), this.userController.getAll)
      .post(validate(create), this.userController.create);
  }
}

export default UsserRoute;
