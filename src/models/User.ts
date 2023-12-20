import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const UserModel = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    adress: {
      type: String,
      trim: true,
    },
    courseInCharge: {
      type: [String],
    },
    state: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("User", UserModel);
