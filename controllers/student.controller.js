const _ = require("lodash");
const joiValidator = require("../helpers/joiValidator.helper");
const studentSchemas = require("../helpers/joi-schemas/studentSchemas");
const studentService = require("../services/student.service");
const responseSender = require("../helpers/responseSender.helper");

module.exports = {
  enRollCourse: async (req, res) => {
    const errorMsgs = joiValidator(req.body, studentSchemas.enrollCourseSchema);
    if (errorMsgs) {
      return responseSender.sendValidationError(res, errorMsgs);
    }

    const uptStd = await studentService.enRollCourse(req.user.userId, req.body);
    return responseSender.sendSuccessResponse(res, uptStd);
  },
};
