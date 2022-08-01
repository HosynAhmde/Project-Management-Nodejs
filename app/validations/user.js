const { body, check } = require("express-validator");

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
module.exports = editeProfileValidator;
