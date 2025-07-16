const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

const authenticateToken = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");
const validateRequest = require("../middlewares/validate-request.middleware");
const { userSchema } = require("../validators/user.schema");

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post(
	"/",
	authenticateToken,
	rbac(["admin"]),
	validateRequest(userSchema),
	UserController.create
);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);

module.exports = router;
