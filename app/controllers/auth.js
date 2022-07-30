const bcrypt = require("bcrypt");
const hashPassword = require("../modules/hashPassword");
const { UserModel } = require("../models/users");
class AuthController {
  async register(req, res) {
    const { username, password, email, mobile } = req.body;
    const hash_Password = hashPassword(password);
    const user = await UserModel.create({
      username,
      password: hash_Password,
      email,
      mobile,
    });
    return res.json(user);
  }
  login() {}
  restPassword() {}
}
module.exports = { AuthController: new AuthController() };
