const fs = require("fs");
const path = require("path");
function createUploadPath() {
  let date = new Date();
  const year = "_" + date.getFullYear();
  const month = "_" + date.getMonth();
  const day = "_" + date.getDate();
  const uploadPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "upload",
    "files",
    year,
    month,
    day
  );
  fs.mkdirSync(uploadPath, { recursive: true });
  return path.join("public", "upload", "files", year, month, day);
}
module.exports = createUploadPath;
