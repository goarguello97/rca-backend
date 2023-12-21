import { NextFunction, Request, Response } from "express";

const verifyUserIsLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const idUser = req.id;
    if (id == idUser) {
      return res
        .status(428)
        .json({ message: "You cannot delete the user, he is logged in." });
    } else {
      next();
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(403).json({ message: error.message });
    } else {
      return res.status(403).json(error);
    }
  }
};

export default verifyUserIsLogin;
