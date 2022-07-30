const { validationResult } = require("express-validator");
function expressValidatorErrors(req, res, next) {
  let message = {};
  const result = validationResult(req);
  console.log(result);
  if (result?.errors?.length > 0) {
    message = {};
    result?.errors.forEach((err) => {
      message[err.param] = err.msg;
    });
    return res.status(400).json({
      status: 400,
      succes: false,
      message,
    });
  }
  next();
}
module.exports = {
  expressValidatorErrors,
};
