const express = require("express");
const router = express.Router();
const PlaceController = require("../controllers/place.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const rbac = require("../middlewares/rbac.middleware");

router.get(
	"/",
	authenticateToken,
	rbac(["admin", "user"]),
	PlaceController.getAll
);
router.get(
	"/:id",
	authenticateToken,
	rbac(["admin", "user"]),
	PlaceController.getById
);
router.post("/", authenticateToken, rbac(["admin"]), PlaceController.create);
router.put("/:id", authenticateToken, rbac(["admin"]), PlaceController.update);
router.delete(
	"/:id",
	authenticateToken,
	rbac(["admin"]),
	PlaceController.delete
);

module.exports = router;
