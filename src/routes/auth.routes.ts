import { Router } from "express";
import { checkSchema } from "express-validator";
import { UserLogin } from "../schemas/UserSchema.js";
import validateFields from "../middlewares/validateFields.js";
import LoginController from "../controllers/login.controllers.js";

const authRouter = Router();

authRouter.post(
  "/",
  checkSchema(UserLogin),
  validateFields,
  LoginController.login
);

export default authRouter;
