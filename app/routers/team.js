const express = require("express");
const router = express.Router();
const chekLogin = require("../middleware/autoLogin");
const { expressValidatorErrors } = require("../middleware/validatorErrors");
const { TeamController } = require("../controllers/team.controller");
const createTeamValidator = require("../validations/team");
router.post(
  "/create",
  chekLogin,
  createTeamValidator(),
  expressValidatorErrors,
  TeamController.createTeam
);

router.get("/list", chekLogin, TeamController.getTeam);

module.exports = { teamRoutes: router };
