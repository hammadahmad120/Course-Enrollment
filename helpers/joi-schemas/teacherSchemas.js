const Joi = require("joi");
module.exports = {
  teacherInfoSchema: Joi.object({
    presentDegree: Joi.string().min(2).max(150).required(),
    bio: Joi.string().min(8).max(300).required(),
  }),
};
