const { body, check } = require("express-validator");

function registerValidator() {
  return [
    body("username").custom((value) => {
      if (value) {
        const usernameregex = /^[a-z]+[a-z0-9\_\.]{3,20}/gi;
        if (usernameregex.test(value)) {
          return true;
        }
        throw "نام کاربری را طبق الگو وارد کنید.";
      }
      throw "نام کاربری نمیتواند خالی باشد.";
    }),
    body("email").isEmail().not().withMessage("ایمیل صحیح نمیباشد."),
    // .notEmpty()
    // .withMessage("ایمیل نمیتواند خالی باشد."),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("شماره موبایل صحیح نمیباشد."),
    // .notEmpty()
    // .withMessage("ایمیل نمیتواند خالی باشد."),
    body("password")
      .isLength({ min: 5, max: 16 })
      .withMessage(" رمز عبور باید حداقل 6 کاراکتر و حداکثر 16 کاراکتر باشد."),
    body("confirmpassword").custom((value, { req }) => {
      if (!value) throw "رمز عبور نمیتواند خالی باشد.";
      if (value !== req?.body?.confirmpassword)
        throw "رمز عبور و تکرار آن یکسان نمیباشد.";
      return true;
    }),
  ];
}
module.exports = { registerValidator };
