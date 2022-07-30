const jwt = require("jsonwebtoken");
function generateToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "1 day",
  });
  return token;
}
module.exports = generateToken;
