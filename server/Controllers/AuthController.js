const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.saveFacePhoto = async (req, res) => {
  try {
    const { userId, photo } = req.body;
    if (!userId || !photo) {
      return res.status(400).json({ message: "User ID and photo are required" });
    }
    const user = await User.findByIdAndUpdate(userId, { photo }, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Photo saved successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error saving photo", error });
  }
};

module.exports.checkAttendance = async (req, res) => {
  try {
    const { userId, photo } = req.body;
    if (!userId || !photo) {
      return res.status(400).json({ message: "User ID and photo are required" });
    }
    const user = await User.findById(userId);
    if (!user || !user.photo) {
      return res.status(404).json({ message: "User or stored photo not found" });
    }
    // Mock comparison: just check if the base64 strings match (replace with real face recognition logic)
    const isMatch = user.photo === photo;
    if (isMatch) {
      return res.status(200).json({ message: "Attendance marked! Face matched.", success: true });
    } else {
      return res.status(401).json({ message: "Face does not match. Attendance not marked.", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error checking attendance", error });
  }
};