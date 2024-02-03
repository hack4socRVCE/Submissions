const User = require("../models/UserModel");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const Login = async(req,res) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username:username });
  } catch (err){
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Register Please" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Inavlid Name / Password" });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_KEY, {
    expiresIn: "1hrs",
  });

  console.log("Generated Token\n", token);

  if (req.cookies) {
    req.cookies[`${existingUser._id}`] = "";
  }

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 ), 
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", User: existingUser}); //Token has encrypted data of id of current user

}

module.exports = Login;