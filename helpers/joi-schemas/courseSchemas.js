const Joi = require("joi");
const mongoose = require("mongoose");
module.exports = {
  createCourseSchema: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    tags: Joi.array().items(Joi.string()),
    creditHours: Joi.number().min(2).max(4).required(),
    isPublished: Joi.boolean(),
  }),

  updateTeachersSchema: Joi.object({
    teachers: Joi.array()
      .required()
      .items(
        Joi.string().custom((value, helper) => {
          if (mongoose.Types.ObjectId.isValid(value)) {
            return true;
          } else {
            return helper.message("Some invalid teacher id provided");
          }
        })
      ),
  }),
};
