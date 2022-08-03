const { param, check } = require("express-validator");
function idValidation() {
  return [param("id").isMongoId().withMessage("شناسه صحیح نمیباشد.")];
}
module.exports = idValidation;
