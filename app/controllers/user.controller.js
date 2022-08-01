const { UserModel } = require("../models/users");

class UserController {
  getProfile(req, res) {
    try {
      const user = req.user;
      return res.json({
        user,
      });
    } catch (error) {
      console.log(error);
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
  addSkills() {}
  updateProfile() {}
  acceptInvaiteInToTeam() {}
  rejectInvaiteToTeam() {}
}
module.exports = {
  UserController: new UserController(),
};
