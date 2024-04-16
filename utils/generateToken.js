import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    console.log(process.env.JWT_SECRET);
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development"
    });
  } catch (error) {
    console.log(error);
  }
};

export default generateToken;