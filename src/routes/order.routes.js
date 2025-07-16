const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");

router.get(
	"/",
	authenticateToken,
	rbac(["admin", "user"]),
	OrderController.getAll
);
router.get(
	"/:id",
	authenticateToken,
	rbac(["admin", "user"]),
	OrderController.getById
);
router.post(
	"/",
	authenticateToken,
	rbac(["admin", "user"]),
	OrderController.create
);
router.put(
	"/:id",
	authenticateToken,
	rbac(["admin", "user"]),
	OrderController.update
);
router.delete(
	"/:id",
	authenticateToken,
	rbac(["admin"]),
	OrderController.delete
);

module.exports = router;
