import User from "../models/User.js";

const uniqueEmail = async (email: string) => {
  const searchEmail = await User.find({ email });
  if (searchEmail.length !== 0)
    throw new Error(`${email} email is already in use.`);
};

export default uniqueEmail;
