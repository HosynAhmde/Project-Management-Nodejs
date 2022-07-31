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
  updateProfile() {}
  addSkills() {}
  updateProfile() {}
  acceptInvaiteInToTeam() {}
  rejectInvaiteToTeam() {}
}
module.exports = {
  UserController: new UserController(),
};
