import { userModel } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).send({ error: "Password don't match." });
    }
    const user = await userModel.findOne({ username });

    if (user) {
      return res.status(400).send({ error: "Try another username." });
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const salt = await bcrypt.genSalt(10);
    const hashedPasswoard = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      fullName,
      username,
      password: hashedPasswoard,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.status(200).send({
      message: "User registered Successfully.",
      userData: {
        _id: newUser._id,
        fullName: fullName,
        username,
        gender,
        profilePic: newUser.profilePic,
      },
      token,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user) {
      return res
        .status(404)
        .send({ message: "Please register first.", success: false });
    }
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .send({ message: "Enter valid password.", success: false });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.status(200).send({
      message: "Logined successfully!!!",
      userData: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        gender: user.gender,
        profilePic: user.profilePic,
      },
      token,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res
      .status(200)
      .send({ message: "Logged out successfully!!!", success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

const me = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await userModel.findById(id);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.status(200).send({
      message: "Logined successfully!!!",
      userData: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,  
        gender: user.gender,
        profilePic: user.profilePic,
      },
      token,
      success: true,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
};

export { signup, login, logout, me };
