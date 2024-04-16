import { userModel } from "../model/userModel.js";

const getUserForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await userModel
      .find({
        _id: { $ne: loggedInUserId },
      })
      .select("-password");

    res
      .status(200)
      .send({
        message: "Data fetched Successfully",
        filteredUsers,
        success: true,
      });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};
export { getUserForSideBar };
