const express = require("express");
const coursesController = require("../controllers/course.controller");

const verifyAuth = require("../middlewares/verifyAuth.middleware");
const verifyAdmin = require("../middlewares/verifyAdmin.middleware");
const asyncHandler = require("../middlewares/asyncRouteHandler.middleware");
const router = express.Router();

router.use(verifyAuth);

router.get("/", asyncHandler(coursesController.getAllCourses));
router.get("/:courseId", asyncHandler(coursesController.getCourseById));
router.put(
  "/updateCourseTeachers/:courseId",
  [verifyAdmin],
  asyncHandler(coursesController.updateCourseTeachers)
);
router.post(
  "/",
  [verifyAdmin],
  asyncHandler(coursesController.createNewCourse)
);

module.exports = router;
