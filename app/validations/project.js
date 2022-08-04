const { body } = require("express-validator");
function createProjectValidator() {
  return [
    body("title").notEmpty().withMessage(" عنوان پروژه نمیتوتند خالی باشد"),
    body("text").notEmpty().withMessage("عنوان پروژه نمیتواند خالی باشد."),
    body("tags")
      .isArray({ min: 0, max: 4 })
      .withMessage("حداکثر استفاده از هشتگ ها 4 عدد است."),
  ];
}
module.exports = { createProjectValidator };
