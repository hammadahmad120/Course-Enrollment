const mongoose = require("mongoose");
const joiValidator = require("../helpers/joiValidator.helper");
const roleSchemas = require("../helpers/joi-schemas/roleSchemas");
const responseSender = require("../helpers/responseSender.helper");
const roleService = require("../services/role.service");

module.exports = {
  getAllRoles: async (req, res) => {
    const roles = await roleService.getAllRolesData();
    return responseSender.sendSuccessResponse(res, roles);
  },

  createNewRole: async (req, res) => {
    const errorMsgs = joiValidator(req.body, roleSchemas.createRoleSchema);
    if (errorMsgs) {
      return responseSender.sendValidationError(res, errorMsgs);
    }

    const role = await roleService.createNewRole(req.body);
    return responseSender.sendSuccessResponse(res, role);
  },
  toggleRoleStatus: async (req, res) => {
    if (!(req.body.id && mongoose.Types.ObjectId.isValid(req.body.id))) {
      return responseSender.sendValidationError(res, ["Invalid id provided"]);
    }
    if (!"status" in req.body || !(typeof req.body.status === "boolean")) {
      return responseSender.sendValidationError(res, [
        "Provide valid status value",
      ]);
    }

    const role = await roleService.toggleRoleStatus(
      req.body.id,
      req.body.status
    );
    return responseSender.sendSuccessResponse(res, role);
  },
};
