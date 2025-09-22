import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"

// login user

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Password is incorrect" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// signup user

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
  }

  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hashpassword,
    });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { login, signup };