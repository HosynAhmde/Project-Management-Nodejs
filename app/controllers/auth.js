const bcrypt = require("bcrypt");
const hashPassword = require("../modules/hashPassword");
const { UserModel } = require("../models/users");
const generateToken = require("../modules/generateToken");
class AuthController {
  async register(req, res, next) {
    try {
      const { username, password, email, mobile } = req.body;
      const hash_Password = hashPassword(password);
      const user = await UserModel.create({
        username,
        password: hash_Password,
        email,
        mobile,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!username)
        throw { stusus: 401, message: "نام کاربری و یا رمز عبور تکراری است." };
      const comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword)
        throw { stusus: 401, message: "نام کاربری و یا رمز عبور تکراری است." };
      const token = generateToken({ username });
      user.token = token;
      await user.save();
      return res.json({
        status: 200,
        succes: true,
        message: "ok",
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }
  restPassword() {}
}
module.exports = { AuthController: new AuthController() };
