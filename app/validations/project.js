const { body } = require("express-validator");
function createProjectValidator() {
  return [
    body("title").notEmpty().withMessage(" عنوان پروژه نمیتوتند خالی باشد"),
    body("text").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد."),
    body("tags")
      .isArray({ min: 0, max: 5 })
      .withMessage("حداکثر استفاده از هشتگ ها ۱۰ عدد است."),
  ];
}
module.exports = { createProjectValidator };
