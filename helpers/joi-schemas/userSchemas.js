const Joi = require("joi");
const mongoose = require("mongoose");

module.exports = {
  createUserSchema: Joi.object({
    username: Joi.string().min(2).max(150).required(),
    password: Joi.string().min(2).max(20).required(),
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().required().email(),
    role: Joi.string()
      .required()
      .custom((value, helper) => {
        if (mongoose.Types.ObjectId.isValid(value)) {
          return true;
        } else {
          return helper.message("Provide valid role id");
        }
      }),
  }),

  loginSchema: Joi.object({
    username: Joi.string().min(2).max(150).required(),
    password: Joi.string().min(2).max(20).required(),
  }),
};
