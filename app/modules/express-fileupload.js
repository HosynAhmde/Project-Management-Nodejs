const fileupload = require("express-fileupload");
const { Model } = require("mongoose");
const path = require("path");
const createUploadPath = require("./pathDirectory");

const uploadfile = async (req, res, next) => {
  try {
    if (req.file || Object.keys(req.files).length == 0)
      throw { status: 400, message: "لطفا یک تصویر را انتخاب کنید." };
    let image = req.files.image;
    let type = path.extname(image.name);
    if (![".png", ".jpg", ".jgep", ".HEIC"].includes(type))
      throw { status: 400, message: "فرمت عکس صحیح نیست." };
    const image_path = path.join(
      createUploadPath(),

      Date.now() + type
    );
    req.body.image = image_path.substring(7);
    let uploadPath = path.join(__dirname, "..", "..", image_path);
    console.log(uploadPath);
    image.mv(uploadPath, (err) => {
      if (err) throw { status: 400, message: "بارگزاری تصویر انجام نشد." };
      next();
    });
  } catch (error) {
    next(error);
  }
};
module.exports = uploadfile;
