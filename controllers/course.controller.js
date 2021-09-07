const _ = require("lodash");
const joiValidator = require("../helpers/joiValidator.helper");
const courseSchemas = require("../helpers/joi-schemas/courseSchemas");
const courseService = require("../services/course.service");
const responseSender = require("../helpers/responseSender.helper");

module.exports = {
  getAllCourses: (req, res) => {
    res.send(courses);
  },

  getCourseById: async (req, res) => {
    const course = await courseService.getCourseInfo(req.params.courseId);
    return responseSender.sendSuccessResponse(res, course);
  },
  updateCourseTeachers: async (req, res) => {
    const errorMsgs = joiValidator(
      req.body,
      courseSchemas.updateTeachersSchema
    );
    if (errorMsgs) {
      return responseSender.sendValidationError(res, errorMsgs);
    }
    const course = await courseService.updateCourseTeachers(
      req.params.courseId,
      req.body
    );
    return responseSender.sendSuccessResponse(res, course);
  },
  createNewCourse: async (req, res) => {
    const errorMsgs = joiValidator(req.body, courseSchemas.createCourseSchema);
    if (errorMsgs) {
      return responseSender.sendValidationError(res, errorMsgs);
    }
    const course = await courseService.createNewCourse(req.body);
    return responseSender.sendSuccessResponse(res, course);
  },
};
