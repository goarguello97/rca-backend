import { Router } from "express";
import verifyAuth from "../middlewares/verifyAuth.js";
import SubjectController from "../controllers/subject.controllers.js";
import { checkSchema } from "express-validator";
import { SubjectId, AddSubject } from "../schemas/SubjectSchema.js";
import validateFields from "../middlewares/validateFields.js";
import verifyAdmin from "../middlewares/verifyUserAdmin.js";

const subjectRouter = Router();

subjectRouter.get("/", [verifyAuth], SubjectController.getAll);
subjectRouter.get(
  "/:id",
  [verifyAuth],
  checkSchema(SubjectId),
  validateFields,
  SubjectController.getById
);
subjectRouter.post(
  "/",
  [verifyAuth, verifyAdmin],
  checkSchema(AddSubject),
  SubjectController.addSubject
);
subjectRouter.patch(
  "/add-student",
  [verifyAuth, verifyAdmin],
  SubjectController.addStudentToSubject
);
subjectRouter.patch(
  "/delete-student",
  [verifyAuth, verifyAdmin],
  SubjectController.deleteStudentToSubject
);
subjectRouter.put(
  "/:id",
  [verifyAuth, verifyAdmin],
  checkSchema(SubjectId),
  validateFields,
  SubjectController.updateSubject
);
subjectRouter.delete(
  "/:id",
  [verifyAuth, verifyAdmin],
  checkSchema(SubjectId),
  validateFields,
  SubjectController.deleteSubject
);

export default subjectRouter;
