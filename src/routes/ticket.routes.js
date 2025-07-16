const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticket.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");

router.get(
	"/",
	authenticateToken,
	rbac(["admin", "user"]),
	TicketController.getAll
);
router.get(
	"/:id",
	authenticateToken,
	rbac(["admin", "user"]),
	TicketController.getById
);
router.post("/", authenticateToken, rbac(["admin"]), TicketController.create);
router.put("/:id", authenticateToken, rbac(["admin"]), TicketController.update);
router.delete(
	"/:id",
	authenticateToken,
	rbac(["admin"]),
	TicketController.delete
);

module.exports = router;
