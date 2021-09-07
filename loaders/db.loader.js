const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to mongoDb"))
    .catch((err) => console.log("Connection to db failed"));
};
