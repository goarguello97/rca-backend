import { Schema } from "express-validator";
import uniqueEmail from "../helpers/uniqueEmail.js";

export const UserRegister: Schema = {
  name: {
    notEmpty: { errorMessage: "Name is required." },
    isLength: {
      errorMessage: "Minium 3 characters and maximum 30 characters.",
      options: { min: 3, max: 30 },
    },
  },
  email: {
    notEmpty: { errorMessage: "Email is required." },
    isEmail: {
      errorMessage: "Enter a valid email.",
    },
    custom: { options: uniqueEmail },
  },
  password: {
    matches: {
      errorMessage:
        "Minimum 8 characters, one uppercase, one number and one special character",
      options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    },
    isLength: {
      errorMessage: "Minimum 8 characters and maximum 30 characters",
      options: { min: 8, max: 30 },
    },
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
  courseInCharge: {
    notEmpty: {
      errorMessage: "Courses are required.",
    },
    isLength: {
      errorMessage: "Minium 5 characters and maximum 25 characters.",
      options: { min: 5, max: 25 },
    },
  },
  state: {
    isBoolean: { errorMessage: "Enter a boolean true or false." },
  },
  role: {
    isIn: {
      errorMessage: "Indicate your role.",
      options: [["USER", "ADMIN"]],
    },
    optional: {
      options: { values: "falsy" },
    },
  },
};

export const UserUpdate: Schema = {
  name: {
    isLength: {
      errorMessage: "Minium 3 characters and maximum 30 characters.",
      options: { min: 3, max: 30 },
    },
  },
  email: {
    isEmail: {
      errorMessage: "Enter a valid email.",
    },
    custom: { options: uniqueEmail },
  },
  password: {
    matches: {
      errorMessage:
        "Minimum 8 characters, one uppercase, one number and one special character",
      options: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    },
    isLength: {
      errorMessage: "Minimum 8 characters and maximum 30 characters",
      options: { min: 8, max: 30 },
    },
  },
  phone: {
    matches: {
      errorMessage: "Enter a valid phone number.",
      options:
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    },
  },
  adress: {
    isLength: {
      errorMessage: "Minium 5 characters and maximum 30 characters.",
      options: { min: 5, max: 30 },
    },
  },
  courseInCharge: {
    isLength: {
      errorMessage: "Minium 5 characters and maximum 25 characters.",
      options: { min: 5, max: 25 },
    },
  },
  state: {
    isBoolean: { errorMessage: "Enter a boolean true or false." },
  },
  role: {
    isIn: {
      errorMessage: "Indicate your role.",
      options: [["USER", "ADMIN"]] ,
    },
    optional: {
      options: { values: "falsy" },
    },
  },
};

export const UserId: Schema = {
  id: { isMongoId: { errorMessage: "It is not a mongo id." } },
};

export const UserLogin: Schema = {
  email: {
    notEmpty: { errorMessage: "Email is required." },
    isEmail: {
      errorMessage: "Enter a valid email.",
    },
  },
  password: {
    notEmpty: { errorMessage: "Password is required." },
  },
};
