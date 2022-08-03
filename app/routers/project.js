const express = require("express");
const { ProjectController } = require("../controllers/project.controller");
const chekLogin = require("../middleware/autoLogin");
const { expressValidatorErrors } = require("../middleware/validatorErrors");
const { createProjectValidator } = require("../validations/project");
const fileupload = require("express-fileupload");
const uploadfile = require("../modules/express-fileupload");
const idValidation = require("../validations/id");
const router = express.Router();

router.post(
  "/create",
  fileupload(),
  chekLogin,
  uploadfile,
  createProjectValidator(),
  expressValidatorErrors,
  ProjectController.createProject
);
router.get("/list", chekLogin, ProjectController.getAllProject);

router.get(
  "/:id",
  chekLogin,
  idValidation(),
  expressValidatorErrors,
  ProjectController.getProjectById
);
router.delete(
  "/remove/:id",
  chekLogin,
  idValidation(),
  expressValidatorErrors,
  ProjectController.removeProject
);
router.put(
  "/update/:id",
  chekLogin,
  idValidation(),
  expressValidatorErrors,
  ProjectController.updateProject
);

module.exports = { projectRoutes: router };
