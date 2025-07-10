const express = require("express");
const router = express.Router();
const PlaceController = require("../controllers/place.controller");

router.get("/", PlaceController.getAll);
router.get("/:id", PlaceController.getById);
router.post("/", PlaceController.create);
router.put("/:id", PlaceController.update);
router.delete("/:id", PlaceController.delete);

module.exports = router;
