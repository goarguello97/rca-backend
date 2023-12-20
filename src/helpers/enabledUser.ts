import User from "../models/User.js";

const userIsTrue = async (email: string) => {
  const searchEmail = await User.findOne({ email });
  if (searchEmail?.state) {
    throw new Error(
      `You are not enabled, an administrator must authorize you.`
    );
  }
};

export default userIsTrue;
