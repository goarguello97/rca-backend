import { Request, Response } from "express";
import CustomError from "../helpers/customError.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

class UserController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const { limit = 15, page = 1 } = req.query;
      const [userCount, users] = await Promise.all([
        User.countDocuments(),
        User.find()
          .skip(Number(limit) * Number(page) - Number(limit))
          .limit(Number(limit)),
      ]);
      return res.status(200).json({ total: userCount, page, users });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  static getUsersIsAcepted = async (req: Request, res: Response) => {
    try {
      const { limit = 15, page = 1 } = req.query;
      const [userCount, users] = await Promise.all([
        User.countDocuments(),
        User.find()
          .skip(Number(limit) * Number(page) - Number(limit))
          .limit(Number(limit))
          .select("-students -courseInCharge -phone -adress -updatedAt"),
      ]);
      if (users.length === 0)
        throw new CustomError("There are no records.", 404);
      return res.status(200).json({ total: userCount, page, users });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  static register = async (req: Request, res: Response) => {
    try {
      const { password, ...user } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const passwordEncripted = bcrypt.hashSync(password, salt);
      const newUser = new User({
        ...user,
        password: passwordEncripted,
      });
      const userSaved = await newUser.save();
      if (!userSaved) throw new CustomError("Fails to save user.", 500);
      return res.status(201).json({ message: "User created." });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const userById = await User.findById(id);
      if (!userById) throw new CustomError("User not found.", 404);
      return res.status(200).json(userById);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const userDeleted = await User.findByIdAndDelete(id);
      if (!userDeleted) throw new CustomError("User not found.", 404);
      return res.status(200).json({ message: "User deleted." });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  static updateById = async (req: Request, res: Response) => {
    try {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10)
        );
      }
      const body = req.body;
      const { id } = req.params;
      const updateUser = await User.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (!updateUser) throw new CustomError("User not found.", 404);
      return res.status(200).json({ message: "User updated.", updateUser });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  static auth = async (req: Request, res: Response) => {
    try {
      const id = req.id;
      const user = await User.findById(id);
      if (!user) throw new CustomError("User not found.", 404);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };
}

export default UserController;
