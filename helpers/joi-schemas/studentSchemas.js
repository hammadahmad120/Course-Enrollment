const Joi = require("joi");
const mongoose = require("mongoose");
const constants = require("../../constants");
module.exports = {
  studentInfoSchema: Joi.object({
    degree: Joi.string()
      .required()
      .custom((value, helper) => {
        if (constants.STUDENT_DEGREES.includes(value)) {
          return true;
        } else {
          return helper.message(
            `Valid degree values are ${constants.STUDENT_DEGREES.toString()}`
          );
        }
      }),
    session: Joi.string()
      .required()
      .custom((value, helper) => {
        if (constants.STUDENT_SESSIONS.includes(value)) {
          return true;
        } else {
          return helper.message(
            `Valid session values are ${constants.STUDENT_SESSIONS.toString()}`
          );
        }
      }),
  }),

  enrollCourseSchema: Joi.object({
    courseId: Joi.string().custom((value, helper) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return true;
      } else {
        return helper.message("Some invalid course id provided");
      }
    }),
    teacherId: Joi.string().custom((value, helper) => {
      if (mongoose.Types.ObjectId.isValid(value)) {
        return true;
      } else {
        return helper.message("Some invalid teacher id provided");
      }
    }),
  }),
};
