const express = require("express");
const { UserController } = require("../controllers/user.controller");
const chekLogin = require("../middleware/autoLogin");
const router = express.Router();

router.get("/profile", chekLogin, UserController.getProfile);
router.post("/profile", chekLogin, UserController.editeProfile);

module.exports = { userRoutes: router };
