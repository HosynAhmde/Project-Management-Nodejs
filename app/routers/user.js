const express = require("express");
const { UserController } = require("../controllers/user.controller");
const chekLogin = require("../middleware/autoLogin");
const chekData = require("../middleware/filterData");
const { expressValidatorErrors } = require("../middleware/validatorErrors");
const { upload_multer } = require("../modules/multer");
const {
  editeProfileValidator,
  imageProfileValidator,
} = require("../validations/user");
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
router.post(
  "/profile-image",
  chekLogin,

  upload_multer.single("image"),
  imageProfileValidator(),
  expressValidatorErrors,
  UserController.uploadProfileImage
);

module.exports = { userRoutes: router };
