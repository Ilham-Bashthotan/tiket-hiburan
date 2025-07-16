const AuthService = require("../services/auth.service");

class AuthController {
	static async login(req, res) {
		try {
			const { email, password } = req.body;
			const result = await AuthService.login(email, password);
			if (!result) {
				return res
					.status(401)
					.json({ message: "Email atau password salah" });
			}
			res.json(result);
		} catch (err) {
			res.status(500).json({
				message: "Terjadi kesalahan server",
				error: err.message,
			});
		}
	}
	static async register(req, res) {
		try {
			const userData = req.body;
			const result = await AuthService.register(userData);
			if (!result.success) {
				return res.status(400).json({ message: result.message });
			}
			res.status(201).json({
				message: "Registrasi berhasil",
				user: result.user,
			});
		} catch (err) {
			res.status(500).json({
				message: "Terjadi kesalahan server",
				error: err.message,
			});
		}
	}
}

module.exports = AuthController;
