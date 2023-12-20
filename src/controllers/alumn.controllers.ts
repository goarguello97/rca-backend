import { Response } from "express";
import CustomError from "../helpers/customError.js";
import { AuthRequest } from "../interfaces/express.interface.js";
import Alumn from "../models/Alumn.js";

class AlumnController {
  getAll = async (req: AuthRequest, res: Response) => {
    try {
      const { limit = 15, page = 1 } = req.query;
      const [alumnsCount, alumns] = await Promise.all([
        Alumn.countDocuments(),
        Alumn.find()
          .skip(Number(limit) * Number(page) - Number(limit))
          .limit(Number(limit)),
      ]);
      res.status(200).json({ alumnsCount, page, alumns });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  addAlumn = async (req: AuthRequest, res: Response) => {
    try {
      const { body } = req;
      const alumn = new Alumn(body);
      const alumnSave = await alumn.save();
      return res.status(201).json({ message: "Created alumn.", alumnSave });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  getById = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const alumn = await Alumn.findById(id);
      if (!alumn) throw new CustomError("Alumn not found.", 404);
      return res.status(200).json({ alumn });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  searchAlumn = async (req: AuthRequest, res: Response) => {
    try {
      const { q } = req.query;
      const alumns = await Alumn.find({
        nameCompleted: { $regex: q, $options: "i" },
      });
      if (alumns.length === 0) throw new CustomError("Alumn not exists.", 404);
      return res.status(200).json({ alumns });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  deleteAlumn = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const alumnDelete = await Alumn.findByIdAndDelete(id);
      if (!alumnDelete) throw new CustomError("Alumn not found.", 404);
      return res.status(200).json({ message: "Alumn deleted." });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  updateAlumn = async (req: AuthRequest, res: Response) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const alumnUpdate = await Alumn.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (!alumnUpdate) throw new CustomError("Alumn not found.", 404);
      return res.status(200).json({ alumnUpdate });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };
}

export default AlumnController;
