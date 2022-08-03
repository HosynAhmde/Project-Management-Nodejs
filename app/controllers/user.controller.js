const { UserModel } = require("../models/users");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      return res.json({
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async editeProfile(req, res, next) {
    try {
      const data = req.body;
      const userID = req.user._id;
      const result = await UserModel.updateOne({ _id: userID }, { $set: data });
      if (result.modifiedCount > 0) {
        return res.send({
          status: 200,
          succes: true,
          message: "آپدیت با موفقیت انجام شد",
        });
      }
      throw { status: 400, message: "به روز رسانی انجام نشد." };
    } catch (error) {
      next(error);
    }
  }
  async uploadProfileImage(req, res, next) {
    try {
      const userID = req.user._id;
      const filepath = req.file?.path?.substring(7);
      const image_profile =
        req.protocol +
        "://" +
        req.get("host") +
        "/" +
        filepath.replace(/[\\\\]/gm, "/");

      const result = await UserModel.updateOne(
        { _id: userID },
        { $set: { image_profile: image_profile } }
      );
      if (result.modifiedCount > 0) {
        return res.send({
          status: 200,
          succes: true,
          message: "آپدیت با موفقیت انجام شد",
        });
      }
      throw { status: 400, message: "به روز رسانی انجام نشد." };
    } catch (error) {
      next(error);
    }
  }
  addSkills() {}
  updateProfile() {}
  acceptInvaiteInToTeam() {}
  rejectInvaiteToTeam() {}
}
module.exports = {
  UserController: new UserController(),
};
