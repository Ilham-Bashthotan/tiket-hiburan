const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");

router.get(
	"/",
	authenticateToken,
	rbac(["admin", "user"]),
	CategoryController.getAll
);
router.get(
	"/:id",
	authenticateToken,
	rbac(["admin", "user"]),
	CategoryController.getById
);
router.post("/", authenticateToken, rbac(["admin"]), CategoryController.create);
router.put(
	"/:id",
	authenticateToken,
	rbac(["admin"]),
	CategoryController.update
);
router.delete(
	"/:id",
	authenticateToken,
	rbac(["admin"]),
	CategoryController.delete
);

module.exports = router;
