import { Schema, model } from "mongoose";
import { IAlumn } from "../interfaces/alumn.interface";

const AlumnModel = new Schema<IAlumn>(
  {
    completedName: {
      type: String,
      trim: true,
    },
    course: {
      type: String,
      trim: true,
    },
    feePaid: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    adress: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Alumn", AlumnModel);
