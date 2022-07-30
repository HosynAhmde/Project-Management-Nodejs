const bcrypt = require("bcrypt");
function hashPassword(pass) {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(pass, salt);
}
module.exports = hashPassword;
