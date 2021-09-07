const responseSender = require("../helpers/responseSender.helper");
const jwt = require("jsonwebtoken");

function verifyAuth(req, res, next) {
  console.log("Authenticating...");
  const token = req.header("x-auth-token");
  if (!token) {
    return responseSender.sendErrorResponse(
      res,
      "Access denied. No token provided",
      401
    );
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (e) {
    return responseSender.sendErrorResponse(res, "Invalid token");
  }
}

module.exports = verifyAuth;
