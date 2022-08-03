const { ProjectModel } = require("../models/project");

class ProjectController {
  async createProject(req, res, next) {
    try {
      const { text, title, image, tags } = req.body;
      const owner = req.user._id;
      const project = await ProjectModel.create({
        text,
        title,
        owner,
        image,
        tags,
      });
      if (!project)
        throw { status: 400, message: "افزودن پروژه با ما مشکل مواجه شد" };
      return res.send({
        project,
        succes: true,
        message: "پروژه با موفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProject(req, res, next) {
    try {
      const owner = req.user._id;

      const projects = await ProjectModel.find({ owner });
      return res.send({
        status: 200,
        succes: true,
        projects,
      });
    } catch (error) {
      next(error);
    }
  }
  async getProjectById(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      console.log(owner, projectID);
      const project = await ProjectModel.findOne({ owner, _id: projectID });
      if (!project) throw { status: 404, message: "پروژه ای یافت نشد!" };
      return res.send({
        succes: true,
        status: 200,
        project,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      const project = await ProjectModel.deleteOne({ owner, _id: projectID });
      if (project.deletedCount == 0)
        throw { status: 404, message: "پروژه حذف نشد" };
      return res.send({
        succes: true,
        status: 200,
        message: "پروژه با موفقیت حذف شد. ",
      });
    } catch (error) {
      next();
    }
  }
  async updateProject(req, res, next) {
    try {
      const owner = req.user._id;

      const projectid = req.params.id;
      const data = { ...req.body };
      const update = await ProjectModel.updateOne(
        { owner, _id: projectid },
        { $set: data }
      );
      if (!update) throw { status: 400, message: "اپدیت انجام نشد" };
      return res.send({
        succes: true,
        message: "اپدیت با موفقیت انجام شد.",
      });
    } catch (error) {
      next(error);
    }
  }
  getProjectOfTeam() {}
  getProjectOfUser() {}
}
module.exports = {
  ProjectController: new ProjectController(),
};
