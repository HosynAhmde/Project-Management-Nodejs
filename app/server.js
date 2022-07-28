const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
const notFound = require("./middleware/not-found");
const { AllRoutes } = require("./routers/router");
const app = express();

class Application {
  constructor(PORT, DB_URL) {
    this.createServer(PORT);
    this.configDatabase(DB_URL);
    this.configAplication();
    this.createRoutes();
    // this.errorHandler();
  }

  configAplication() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "public")));
  }
  createServer(PORT) {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server Run On POrt ${PORT}`);
    });
  }
  configDatabase(DB_URL) {
    mongoose.connect(DB_URL, (error) => {
      if (error) throw error;
      return console.log("Connected to db");
    });
  }
  createRoutes() {
    app.use(AllRoutes);
  }
  errorHandler() {}
}

module.exports = Application;
