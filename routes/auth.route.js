const express = require("express");
const verifyAuth = require("../middlewares/verifyAuth.middleware");
const verifyAdmin = require("../middlewares/verifyAdmin.middleware");
const asyncHandler = require("../middlewares/asyncRouteHandler.middleware");
const authController = require("../controllers/auth.controller");
const router = express.Router();

router.post(
  "/createUser",
  [verifyAuth, verifyAdmin],
  asyncHandler(authController.createNewUser)
);
router.get("/me", verifyAuth, asyncHandler(authController.getCurrentUser));
router.post("/login", asyncHandler(authController.loginUser));
router.put(
  "/testTransaction",
  verifyAuth,
  asyncHandler(authController.testTransaction)
);

module.exports = router;
