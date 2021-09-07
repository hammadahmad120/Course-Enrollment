const express = require("express");
const studentController = require("../controllers/student.controller");
const verifyAuth = require("../middlewares/verifyAuth.middleware");
const asyncHandler = require("../middlewares/asyncRouteHandler.middleware");
const router = express.Router();

router.use(verifyAuth);

router.put("/enrollCourse", asyncHandler(studentController.enRollCourse));

module.exports = router;
