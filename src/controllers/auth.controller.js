const AuthService = require("../services/auth.service");
const AppError = require("../utils/appError");

class AuthController {
	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const result = await AuthService.login(email, password);
			if (!result) {
				// Operasional error: autentikasi gagal
				return next(new AppError("Email atau password salah", 401));
			}
			res.json(result);
		} catch (err) {
			// Programmer error: bug, error tak terduga
			next(err);
		}
	}
	static async refresh(req, res, next) {
		try {
			const { refreshToken } = req.body;
			const result = await AuthService.refreshToken(refreshToken);
			if (!result.success) {
				return next(new AppError(result.message, 401));
			}
			res.json({ accessToken: result.accessToken });
		} catch (err) {
			next(err);
		}
	}
	static async register(req, res, next) {
		try {
			const userData = req.body;
			const result = await AuthService.register(userData);
			if (!result.success) {
				// Operasional error: input tidak valid/email sudah terdaftar
				return next(new AppError(result.message, 400));
			}
			res.status(201).json({
				message: "Registrasi berhasil",
				user: result.user,
			});
		} catch (err) {
			// Programmer error: bug, error tak terduga
			next(err);
		}
	}
}

module.exports = AuthController;
