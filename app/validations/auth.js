const { body } = require("express-validator");
const { UserModel } = require("../models/users");

function registerValidator() {
  return [
    body("username")
      .notEmpty()
      .withMessage("نام کاربری نمیتواند خالی باشد.")
      .matches(/^[a-z]+[a-z0-9\_\.]{3,20}/gi)
      .withMessage("نام کاربری را طبق الگو وارد کنید.")
      .custom(async (username) => {
        const user = await UserModel.findOne({ username });
        if (user) throw "نام کاربری قبلا استفاده شده است.";
      }),
    body("email")
      .isEmail()
      .withMessage("ایمیل صحیح نمیباشد.")
      .notEmpty()
      .withMessage("ایمیل نمیتواند خالی باشد.")
      .custom(async (email) => {
        const user = await UserModel.findOne({ email });
        if (user) throw "ایمیل قبلا استفاده شده است.";
      }),
    body("mobile")
      .isMobilePhone("fa-IR")
      .withMessage("شماره موبایل صحیح نمیباشد.")
      .notEmpty()
      .withMessage("ایمیل نمیتواند خالی باشد.")
      .custom(async (mobile) => {
        const user = await UserModel.findOne({ mobile });
        if (user) throw "شماره موبایل قبلا استفاده شده است.";
      }),
    body("password")
      .isLength({ min: 5, max: 16 })
      .withMessage(" رمز عبور باید حداقل 5 کاراکتر و حداکثر 16 کاراکتر باشد."),
    body("confirmpassword").custom((value, { req }) => {
      if (!value) throw "رمز عبور نمیتواند خالی باشد.";
      if (value !== req?.body?.confirmpassword)
        throw "رمز عبور و تکرار آن یکسان نمیباشد.";
      return true;
    }),
  ];
}

function loginValidator() {
  return [
    body("username")
      .notEmpty()
      .withMessage("نام کاربری نمیتواند خالی باشد.")
      .matches(/^[a-z]+[a-z0-9\_\.]{3,20}/gi),
    // .custom(async (username) => {
    //   const user = await UserModel.findOne({ username });
    //   if (!user) throw "نام کاربری و یا رمز عبور اشتباه می باشد.";
    //   return true;
    // }),
    body("password")
      .isLength({ min: 5, max: 16 })
      .withMessage(" رمز عبور باید حداقل 5 کاراکتر و حداکثر 16 کاراکتر باشد."),
  ];
}
module.exports = { registerValidator, loginValidator };
