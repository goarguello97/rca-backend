import { Router } from "express";
import userRouter from "./user.routes.js";
import alumnRouter from "./alumns.routes.js";
import subjectRouter from "./subject.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/alumns", alumnRouter);
router.use("/subjects", subjectRouter);
router.use("/auth", authRouter);

export default router;
