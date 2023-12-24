import { Schema, model } from "mongoose";
import { ISubject } from "../interfaces/subject.interface.js";

const SubjectModel = new Schema<ISubject>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Alumn",
      },
    ],
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model<ISubject>("Subject", SubjectModel);
