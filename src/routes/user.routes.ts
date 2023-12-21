import { Router } from "express";
import { checkSchema } from "express-validator";
import UserController from "../controllers/user.controllers.js";
import validateFields from "../middlewares/validateFields.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import { UserId, UserRegister, UserUpdate } from "../schemas/UserSchema.js";
import verifyAdmin from "../middlewares/verifyUserAdmin.js";
import verifyUserIsLogin from "../middlewares/verifyUserIsLogin.js";

const userRouter = Router();

userRouter.get("/", [verifyAuth], UserController.getAll);
userRouter.get("/auth", verifyAuth, UserController.auth);
userRouter.get("/acepted", UserController.getUsersIsAcepted);
userRouter.get(
  "/:id",
  [verifyAuth, verifyAdmin],
  checkSchema(UserId),
  validateFields,
  UserController.getById
);
userRouter.post(
  "/register",
  checkSchema(UserRegister),
  validateFields,
  UserController.register
);
userRouter.delete(
  "/:id",
  [verifyAuth, verifyAdmin, verifyUserIsLogin],
  checkSchema(UserId),
  validateFields,
  UserController.deleteUser
);
userRouter.put(
  "/:id",
  [verifyAuth, verifyAdmin],
  checkSchema(UserUpdate),
  validateFields,
  UserController.updateById
);

export default userRouter;
