const responseSender = require("../helpers/responseSender.helper");

function verifyAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return responseSender.sendErrorResponse(
      res,
      "You don't have access to this resource",
      403
    );
  }
}

module.exports = verifyAdmin;
