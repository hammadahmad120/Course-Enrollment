const Joi = require("joi");

module.exports = {
  createRoleSchema: Joi.object({
    roleName: Joi.string().min(2).max(150).required(),
    isActive: Joi.boolean(),
  }),
};
