const { registerValidator } = require("../validations/auth");
const { validationResult } = require("express-validator");
const { expressValidatorErrors } = require("../middleware/validatorErrors");

class AuthController {
  register(req, res) {
    const { username, epassword, email, mobile } = req.body;

    return res.json(req.body);
  }
  login() {}
  restPassword() {}
}
module.exports = { AuthController: new AuthController() };
