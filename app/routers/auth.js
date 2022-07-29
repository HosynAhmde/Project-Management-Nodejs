const express = require("express");
const { AuthController } = require("../controllers/auth");
const { expressValidatorErrors } = require("../middleware/validatorErrors");
const { registerValidator } = require("../validations/auth");
// const { expressValidatorErrors } = require("../middleware/validatorErrors");
const router = express.Router();

router.post(
  "/register",
  registerValidator(),
  expressValidatorErrors,
  AuthController.register
);

module.exports = { authRoutes: router };
