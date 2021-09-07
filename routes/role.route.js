const express = require("express");
const verifyAuth = require("../middlewares/verifyAuth.middleware");
const verifyAdmin = require("../middlewares/verifyAdmin.middleware");
const asyncHandler = require("../middlewares/asyncRouteHandler.middleware");
const roleController = require("../controllers/role.controller");
const router = express.Router();

router.use(verifyAuth, verifyAdmin);

router.get("/", asyncHandler(roleController.getAllRoles));
router.post("/createRole", asyncHandler(roleController.createNewRole));
router.put("/toggleRole", asyncHandler(roleController.toggleRoleStatus));

module.exports = router;
