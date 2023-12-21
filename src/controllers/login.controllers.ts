import CustomError from "../helpers/customError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

class LoginController {
  static login = async (req: Request, res: Response) => {
    try {
      if (process.env.JWT_SECRET_TOKEN) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new CustomError("Usuario no encontrado", 404);
        const isOk = bcrypt.compareSync(password, user.password as string);
        if (!isOk) throw new CustomError("credenciales invalidas", 401);
        const token = jwt.sign(
          { email, id: user._id },
          process.env.JWT_SECRET_TOKEN,
          { expiresIn: "3h" }
        );
        return res.status(200).json({ message: "logeo correcto", token, user });
      } else {
        throw new Error("JWT_SECRET is null.");
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };
}

export default LoginController;
