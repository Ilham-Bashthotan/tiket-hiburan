const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const validateRequest = require("../middlewares/validate-request.middleware");
const { loginSchema, registerSchema } = require("../validators/auth.schema");

router.post("/login", validateRequest(loginSchema), AuthController.login);
router.post(
	"/register",
	validateRequest(registerSchema),
	AuthController.register
);

module.exports = router;
