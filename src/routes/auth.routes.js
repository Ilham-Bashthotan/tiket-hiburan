const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const validateRequest = require("../middlewares/validate-request.middleware");
const { loginSchema, registerSchema } = require("../validators/auth.schema");
const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 menit
	max: 10, // maksimal 10 request per windowMs per IP
	message: { message: "Terlalu banyak percobaan, silakan coba lagi nanti." },
	standardHeaders: "draft-7", // Menggunakan header RateLimit standar IETF
	legacyHeaders: false, // Nonaktifkan header X-RateLimit-* yang lama
});

router.post(
	"/login",
	authLimiter,
	validateRequest(loginSchema),
	AuthController.login
);
router.post(
	"/register",
	authLimiter,
	validateRequest(registerSchema),
	AuthController.register
);

module.exports = router;
