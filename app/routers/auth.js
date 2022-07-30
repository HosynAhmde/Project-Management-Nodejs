const express = require("express");
const { AuthController } = require("../controllers/auth");
const { expressValidatorErrors } = require("../middleware/validatorErrors");
const { registerValidator, loginValidator } = require("../validations/auth");
// const { expressValidatorErrors } = require("../middleware/validatorErrors");
const router = express.Router();

router.post(
  "/register",
  registerValidator(),
  expressValidatorErrors,
  AuthController.register
);
router.post(
  "/login",
  loginValidator(),
  expressValidatorErrors,
  AuthController.login
);

module.exports = { authRoutes: router };
