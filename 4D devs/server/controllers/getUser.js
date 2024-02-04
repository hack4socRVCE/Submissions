const User = require("../models/UserModel");

const getUser = async (req, res) => {
  try {
    const userID = req.id;

    const userData = await User.findById(userID, "-password");

    userData
      ? res.status(200).json({ userData })
      : res.status(404).json({ message: "User Not Found" });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getUser };
