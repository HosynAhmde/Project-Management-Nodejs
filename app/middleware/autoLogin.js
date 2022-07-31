const { UserModel } = require("../models/users");
const { tokenverify } = require("../modules/JwtToken");

const chekLogin = async (req, res, next) => {
  try {
    const authorization = req?.headers?.authorization;
    if (!authorization)
      throw { status: 401, message: "لطفا به حساب کاربری خود وارد شوید." };

    let token = authorization.split(" ")?.[1];
    if (!token)
      throw { status: 401, message: "لطفا به حساب کاربری خود وارد شوید." };
    const result = tokenverify(token);
    const { username } = result;

    const user = await UserModel.findOne({ username }, { password: 0 });
    if (!user)
      throw { status: 401, message: "لطفا به حساب کاربری خود وارد شوید." };
    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};
module.exports = chekLogin;
