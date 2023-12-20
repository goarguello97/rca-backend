import { Response } from "express";
import CustomError from "../helpers/customError.js";
import { AuthRequest } from "../interfaces/express.interface.js";
import Subject from "../models/Subject.js";

class SubjectController {
  getAll = async (req: AuthRequest, res: Response) => {
    try {
      const { limit = 15, page = 1 } = req.query;
      const [subjectCount, subjects] = await Promise.all([
        Subject.countDocuments(),
        Subject.find()
          .skip(Number(limit) * Number(page) - Number(limit))
          .limit(Number(limit)),
      ]);
      return res.status(200).json({ total: subjectCount, page, subjects });
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
      const subjectById = await Subject.findById(id).populate(
        "students teacher"
      );
      if (!subjectById) throw new CustomError("Subject not found.", 404);
      return res.status(200).json(subjectById);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  addSubject = async (req: AuthRequest, res: Response) => {
    try {
      const { body } = req;
      const subject = new Subject(body);
      await subject.save();
      return res.status(201).json({ message: `Subject ${body.name} added.` });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  deleteSubject = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const subjectDelete = await Subject.findByIdAndDelete(id);
      if (!subjectDelete) throw new CustomError("Subject not found.", 404);
      return res.status(200).json({ message: "Subject deleted." });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };

  updateSubject = async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const updateSubject = await Subject.findByIdAndUpdate(id, body, {
        new: true,
      });
      if (!updateSubject) throw new CustomError("Subject not found.", 404);
      return res.status(200).json(updateSubject);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.status(500).json(error);
      }
    }
  };
}

export default SubjectController;
