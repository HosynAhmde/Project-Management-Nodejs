const express = require("express");
const { authRoutes } = require("./auth");
const { projectRoutes } = require("./project");
const { teamRoutes } = require("./team");
const { userRoutes } = require("./user");
const router = express.Router();

router.use("/project", projectRoutes);
router.use("/team", teamRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = { AllRoutes: router };
