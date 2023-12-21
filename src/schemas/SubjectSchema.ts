import { Schema } from "express-validator";

export const AddSubject: Schema = {
  name: {
    notEmpty: { errorMessage: "Name is required." },
    isLength: {
      errorMessage: "Minium 3 characters and maximum 20 characters.",
      options: { min: 3, max: 20 },
    },
  },
};

export const SubjectId: Schema = {
  id: { isMongoId: { errorMessage: "It is not a mongo id." } },
};
