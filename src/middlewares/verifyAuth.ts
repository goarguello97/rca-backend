import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { IJwtPayload } from "../interfaces/jwt.interface.js";

dotenv.config();

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (JWT_SECRET_TOKEN) {
      const token = req.header("authorization");
      if (!token) throw new Error("Invalid credentials, JTW");
      const { id } = jwt.verify(token, JWT_SECRET_TOKEN) as IJwtPayload;
      if (!id) throw new Error("Invalid credentials, id");
      req.id = id;
      next();
    } else {
      throw new Error("JWT_SECRET is null.");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ message: error.message });
    } else {
      return res.status(403).json(error);
    }
  }
};

export default verifyAuth;
