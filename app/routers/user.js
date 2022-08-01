const express = require("express");
const { UserController } = require("../controllers/user.controller");
const chekLogin = require("../middleware/autoLogin");
const chekData = require("../middleware/filterData");
const { expressValidatorErrors } = require("../middleware/validatorErrors");
const editeProfileValidator = require("../validations/user");
const router = express.Router();

router.get("/profile", chekLogin, UserController.getProfile);
router.post(
  "/profile",
  chekLogin,
  editeProfileValidator(),
  expressValidatorErrors,
  chekData,
  UserController.editeProfile
);

module.exports = { userRoutes: router };
