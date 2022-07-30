const Aplication = require("./app/server");
const db =
  "mongodb+srv://admin:admin@cluster0.cl1tf.mongodb.net/?retryWrites=true&w=majority";
require("dotenv").config();

new Aplication(3000, db);
