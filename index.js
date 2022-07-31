require("dotenv").config();

const Aplication = require("./app/server");
const db = process.env.DB_URL;

new Aplication(3000, db);
