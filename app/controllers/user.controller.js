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
  editeProfile(req, res, next) {
    try {
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
