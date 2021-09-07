const express = require("express");
const logger = require("./helpers/logger.helper");
require("dotenv").config({
  path: process.env.NODE_ENV ? ".env" : ".env.development",
});
const app = express();
require("./loaders/allRoutes.loader")(app);
require("./loaders/db.loader")();

process.on("uncaughtException", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  logger.error(ex.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
