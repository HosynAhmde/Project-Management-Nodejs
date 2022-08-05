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
  async getTeam(req, res, next) {
    try {
      const team = await TeamModel.find({});
      res.send({
        team,
      });
    } catch (error) {
      next(error);
    }
  }
  inviteUserToTeam() {}
  removeTeam() {}
  updateTeam() {}
  removeUserFromTeam() {}
}
module.exports = { TeamController: new TeamController() };
