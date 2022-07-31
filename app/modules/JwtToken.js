const jwt = require("jsonwebtoken");
function generateToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "3 day",
  });
  return token;
}

function tokenverify(token) {
  const result = jwt.verify(token, process.env.SECRET);
  if (!result?.username)
    throw { status: 401, message: "لظفا وارد حساب کاربری خود شوید" };
  return result;
}
module.exports = { generateToken, tokenverify };
