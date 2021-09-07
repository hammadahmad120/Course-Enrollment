const joiValidator = require("../helpers/joiValidator.helper");
const userSchemas = require("../helpers/joi-schemas/userSchemas");
const teacherSchemas = require("../helpers/joi-schemas/teacherSchemas");
const studentSchemas = require("../helpers/joi-schemas/studentSchemas");
const responseSender = require("../helpers/responseSender.helper");
const exceptionGenerator = require("../helpers/exceptionGenerator.helper");
const authService = require("../services/auth.service");
const roleService = require("../services/role.service");

module.exports = {
  createNewUser: async (req, res) => {
    let errorMsgs = joiValidator(
      req.body?.userInfo,
      userSchemas.createUserSchema
    );
    if (errorMsgs) {
      return responseSender.sendValidationError(res, errorMsgs);
    }
    const role = await roleService.getRoleById(req.body?.userInfo?.role);
    if (!role) {
      throw exceptionGenerator("Role not exist with given id");
    }
    if (role?.roleName === "teacher") {
      errorMsgs = joiValidator(
        req.body?.roleInfo,
        teacherSchemas.teacherInfoSchema
      );
      if (errorMsgs) {
        return responseSender.sendValidationError(res, errorMsgs);
      }
    } else if (role?.roleName === "student") {
      errorMsgs = joiValidator(
        req.body?.roleInfo,
        studentSchemas.studentInfoSchema
      );
      if (errorMsgs) {
        return responseSender.sendValidationError(res, errorMsgs);
      }
    }
    const user = await authService.createNewUser(req.body, role);

    return responseSender.sendSuccessResponse(res, user);
  },
  getCurrentUser: async (req, res) => {
    const userId = req.user.userId;

    const user = await authService.getCurrentUser(userId);
    return responseSender.sendSuccessResponse(res, user);
  },
  loginUser: async (req, res) => {
    const errorMsgs = joiValidator(req.body, userSchemas.loginSchema);
    if (errorMsgs) {
      return responseSender.sendValidationError(res, errorMsgs);
    }

    const user = await authService.loginUser(
      req.body.username,
      req.body.password
    );
    return responseSender.sendSuccessResponse(res, user);
  },
  testTransaction: async (req, res) => {
    const user = await authService.testingTransaction(
      req.user.userId,
      req.body.value ?? "Jango"
    );
    return responseSender.sendSuccessResponse(res, user);
  },
};
