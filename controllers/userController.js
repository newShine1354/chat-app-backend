import { userModel } from "../model/userModel.js";

const getUserForSideBar = async (req, res) => {
  try {
    // Authentication flow
    // const loggedInUserId = req.user._id;

    // Without Authentication flow
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }
    const filteredUsers = await userModel
      .find({
        _id: { $ne: id },
      })
      .select("-password");

    res.status(200).send({
      message: "Data fetched Successfully",
      filteredUsers,
      success: true,
    });
  } catch (error) {
    res.status(500).send({ message: error.message, success: false });
  }
};
export { getUserForSideBar };
