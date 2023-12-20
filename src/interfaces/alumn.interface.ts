import { Document } from "mongoose";

export interface IAlumn extends Document {
  completedName: {
    type: string;
    trim: boolean;
  };
  course: {
    type: string;
    trim: boolean;
  };
  feePaid: {
    type: boolean;
    default: boolean;
  };
  phone: {
    type: number;
    trim: boolean;
  };
  adress: {
    type: string;
    trim: boolean;
  };
}
