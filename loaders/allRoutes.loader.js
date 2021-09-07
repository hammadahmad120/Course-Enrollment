const express = require("express");
const errorHandler = require("../middlewares/errorHandler.middleware");
const coursesRoutes = require("../routes/course.route");
const studentRoutes = require("../routes/student.route");
const roleRoutes = require("../routes/role.route");
const authRoutes = require("../routes/auth.route");

module.exports = function (app) {
  //middlewares
  app.use(express.static("public"));
  app.use(express.json());

  //routes
  app.use("/api/courses", coursesRoutes);
  app.use("/api/students", studentRoutes);
  app.use("/api/roles", roleRoutes);
  app.use("/api/auth", authRoutes);

  //error handling middleware
  app.use(errorHandler);
};
