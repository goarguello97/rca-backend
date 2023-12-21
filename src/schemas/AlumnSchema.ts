import { Schema } from "express-validator";

export const AlumnRegister: Schema = {
  fullName: {
    notEmpty: { errorMessage: "Full name is required." },
    isLength: {
      errorMessage: "Minium 5 characters and maximum 30 characters.",
      options: { min: 5, max: 30 },
    },
  },

  course: {
    notEmpty: { errorMessage: "Course is required." },
    isLength: {
      errorMessage: "Minium 5 characters and maximum 30 characters.",
      options: { min: 5, max: 30 },
    },
  },
  feePaid: {
    isBoolean: { errorMessage: "Boolean field only." },
  },
  phone: {
    matches: {
      errorMessage: "Enter a valid phone number.",
      options:
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    },
  },
  adress: {
    notEmpty: { errorMessage: "Enter an adress." },
    isLength: {
      errorMessage: "Minium 5 characters and maximum 30 characters.",
      options: { min: 5, max: 30 },
    },
  },
};

export const AlumnId: Schema = {
  id: { isMongoId: { errorMessage: "It is not a mongo id." } },
};
