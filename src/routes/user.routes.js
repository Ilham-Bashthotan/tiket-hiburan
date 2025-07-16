const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

const authenticateToken = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");
const validateRequest = require("../middlewares/validate-request.middleware");
const { userSchema } = require("../validators/user.schema");

router.get(
	"/",
	authenticateToken,
	rbac(["admin", "user"]),
	UserController.getAll
);
router.get(
	"/:id",
	authenticateToken,
	rbac(["admin", "user"]),
	UserController.getById
);
router.post(
	"/",
	authenticateToken,
	rbac(["admin"]),
	validateRequest(userSchema),
	UserController.create
);
router.put(
	"/:id",
	authenticateToken,
	rbac(["admin"]),
	validateRequest(userSchema),
	UserController.update
);
router.delete(
	"/:id",
	authenticateToken,
	rbac(["admin"]),
	UserController.delete
);

module.exports = router;
