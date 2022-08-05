const { TeamModel } = require("../models/teams");
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

  inviteUserToTeam() {}
  updateTeam() {}
  removeUserFromTeam() {}
}
module.exports = { TeamController: new TeamController() };
