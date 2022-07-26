const Aplication = require("./app/server");
const db = "mongodb://127.0.0.1/projectmanagement";
new Aplication(3000, db);
