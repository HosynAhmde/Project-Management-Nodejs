const { TeamModel } = require("../models/teams");
const { UserModel } = require("../models/users");
class TeamController {
  async createTeam(req, res, next) {
    try {
      const owner = req.user._id;
      const { name, description, username } = req.body;
      const team = await TeamModel.create({
        name,
        description,
        username,
        owner,
      });
      if (!team) throw { status: 500, message: "ایجاد تیم با مشکل مواجه شد!!" };
      return res.send({
        status: 200,
        succes: true,
        team,
      });
    } catch (error) {
      next(error);
    }
  }
  async getTeams(req, res, next) {
    try {
      const team = await TeamModel.find({});
      res.send({
        team,
      });
    } catch (error) {
      next(error);
    }
  }
  async getTeamById(req, res, next) {
    try {
      const teamID = req.params.id;
      const team = await TeamModel.findById(teamID);
      if (!team) throw { status: 404, message: "تیمی یافت نشد." };
      return res.send({
        status: 200,
        succes: true,
        team,
      });
    } catch (error) {
      next(error);
    }
  }
  async getMyTeams(req, res, next) {
    try {
      const userID = req.user._id;
      const team = await TeamModel.find({
        $or: [{ owner: userID }, { users: userID }],
      });
      return res.send({
        status: 200,
        succes: true,
        team,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeTeam(req, res, next) {
    try {
      const teamID = req.params.id;
      const team = await TeamModel.findById(teamID);
      if (!team) throw { status: 404, message: "تیمی یافت نشد." };
      const result = await TeamModel.deleteOne({ _id: teamID });
      if (result.deletedCount == 0)
        throw { status: 400, message: "حذف تیم انجام نشد" };
      return res.send({
        message: "حذف با موفقیت انجام شد.",
        status: 200,
        succes: true,
      });
    } catch (error) {
      next();
    }
  }

  async inviteUserToTeam(req, res, next) {
    try {
      const userID = req.user._id;
      const { username, teamID } = req.params;
      const team = await TeamModel.findOne({
        $or: [{ owner: userID }, { users: userID }],
        _id: teamID,
      });
      if (!team)
        throw { status: 400, message: "تیمی جهت دعوت کردن افراد یافت نشد. " };
      const user = await UserModel.findOne({ username });
      if (!user)
        throw {
          status: 400,
          message: "کاربر مورد نظر جهت دعوت کردن وجود ندارد.",
        };
      const userInvited = await TeamModel.findOne({
        $or: [{ owner: user._id }, { users: user._id }],
        _id: teamID,
      });
      if (userInvited)
        throw {
          status: 400,
          message: "کاربر مورد نظر قبلا به تیم دعوت شده است. ",
        };
      const request = {
        caller: req.user.username,
        requestdate: new Date(),
        teamID,
        status: "pending",
      };
      const updateUserResult = await UserModel.updateOne(
        { username },
        {
          $push: { inviteRequest: request },
        }
      );
      if (updateUserResult == 0)
        throw { status: 500, message: "درخواست ثبت  نشد" };
      return res.send({
        status: 200,
        succes: true,
        message: "ثبت درخواست با موفقیت انجام شد.",
      });
    } catch (error) {
      next(error);
    }
  }
  updateTeam() {}
  removeUserFromTeam() {}
}
module.exports = { TeamController: new TeamController() };
