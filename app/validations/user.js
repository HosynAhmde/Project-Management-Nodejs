const { body, check } = require("express-validator");
const path = require("path");
function editeProfileValidator() {
  return [
    body("first_name")
      .isString()
      .notEmpty()
      .withMessage("لطفا نام خودرا وارد کنید."),
    body("last_name")
      .isString()
      .notEmpty()
      .withMessage("لطفا نام خاموادگی خودرا وارد کنید."),
  ];
}

function imageProfileValidator() {
  return [
    body("image").custom((value, { req }) => {
      if (Object.keys(req.file).length == 0) throw "لطفا یک تصویر انتخاب کنید";
      const type = path.extname(req.file?.originalname);

      const types = [".jpg", ".png", ".jpeg", ".webp"];
      if (!types.includes(type))
        throw { message: "فرمت ارسال شده صحیح  نمیباشد." };
      const maxsize = 3 * 1024 * 1024;
      if (req.file.size > maxsize)
        throw "حجم عکس نمیتواند بیشتر از 3مگابایت باشد";
      return true;
    }),
  ];
}
module.exports = { editeProfileValidator, imageProfileValidator };
