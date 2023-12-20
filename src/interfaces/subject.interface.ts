import { Types } from "mongoose";

export interface ISubject {
  name: String;
  students: Types.ObjectId[];
  teacher: Types.ObjectId;
}
