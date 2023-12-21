import { Router } from "express";
import AlumnController from "../controllers/alumn.controllers.js";
import validateFields from "../middlewares/validateFields.js";
import verifyAuth from "../middlewares/verifyAuth.js";
import verifyAdmin from "../middlewares/verifyUserAdmin.js";
import { checkSchema } from "express-validator";
import { AlumnId, AlumnRegister } from "../schemas/AlumnSchema.js";

const alumnRouter = Router();

alumnRouter.get("/", [verifyAuth], AlumnController.getAll);
alumnRouter.get(
  "/search",
  verifyAuth,
  validateFields,
  AlumnController.searchAlumn
);
alumnRouter.get(
  "/:id",
  [verifyAuth, verifyAdmin],
  checkSchema(AlumnId),
  validateFields,
  AlumnController.getById
);
alumnRouter.post(
  "/",
  [verifyAuth, verifyAdmin],
  checkSchema(AlumnRegister),
  validateFields,
  AlumnController.addAlumn
);
alumnRouter.delete(
  "/:id",
  [verifyAuth, verifyAdmin],
  checkSchema(AlumnId),
  validateFields,
  AlumnController.deleteAlumn
);
alumnRouter.put(
  "/:id",
  [verifyAuth, verifyAdmin],
  checkSchema(AlumnId),
  validateFields,
  AlumnController.updateAlumn
);

export default alumnRouter;
