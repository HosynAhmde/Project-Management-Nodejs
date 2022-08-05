const express = require("express");
const router = express.Router();
const chekLogin = require("../middleware/autoLogin");
const { expressValidatorErrors } = require("../middleware/validatorErrors");
const { TeamController } = require("../controllers/team.controller");
const createTeamValidator = require("../validations/team");
const idValidation = require("../validations/id");
router.post(
  "/create",
  chekLogin,
  createTeamValidator(),
  expressValidatorErrors,
  TeamController.createTeam
);

router.get("/list", chekLogin, TeamController.getTeams);
router.get("/me", chekLogin, TeamController.getMyTeams);

router.get(
  "/:id",
  chekLogin,
  idValidation(),
  expressValidatorErrors,
  TeamController.getTeamById
);
router.delete(
  "/:id",
  chekLogin,
  idValidation(),
  expressValidatorErrors,
  TeamController.removeTeam
);
module.exports = { teamRoutes: router };
