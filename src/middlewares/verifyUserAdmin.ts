import { NextFunction, Response } from "express";
import { AuthRequest } from "../interfaces/express.interface.js";
import User from "../models/User.js";

const verifyAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.id;
    const user = await User.findById(id);
    if (user && user.role === "ADMIN") {
      next();
    } else {
      throw new Error("You do not have permissions.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ message: error.message });
    } else {
      return res.status(403).json(error);
    }
  }
};

export default verifyAdmin;
