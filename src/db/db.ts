import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URI = process.env.DB_URI;

const connectionDB = async () => {
  try {
    if (DB_URI) {
      await mongoose.connect(DB_URI);
    } else {
      throw new Error("DB_URI null...");
    }
    console.log("Database connected...");
  } catch (error) {
    console.error(error);
  }
};

export default connectionDB;