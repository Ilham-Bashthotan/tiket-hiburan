const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
	static async login(email, password) {
		const user = await User.findOne({ where: { email } });
		if (!user) return null;
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) return null;
		const token = jwt.sign(
			{ id: user.id, role: user.role, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);
		return {
			token,
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
				fullName: user.fullName,
			},
		};
	}
	static async refreshToken(refreshToken) {
		if (!refreshToken) {
			return { success: false, message: "Refresh token tidak ditemukan" };
		}
		// Validasi refresh token
		let payload;
		try {
			payload = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);
		} catch (err) {
			return { success: false, message: "Refresh token tidak valid" };
		}
		// Cek apakah token ada di database (implementasi sederhana, bisa disimpan di tabel User atau tabel khusus)
		const user = await User.findOne({
			where: { id: payload.id, refreshToken },
		});
		if (!user) {
			return { success: false, message: "Refresh token tidak ditemukan" };
		}
		// Terbitkan access token baru
		const accessToken = jwt.sign(
			{ id: user.id, role: user.role, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: "15m" }
		);
		return { success: true, accessToken };
	}
	static async register(data) {
		const existing = await User.findOne({ where: { email: data.email } });
		if (existing) {
			return { success: false, message: "Email sudah terdaftar" };
		}
		const saltRounds = 10;
		data.password = await bcrypt.hash(data.password, saltRounds);
		const user = await User.create({
			fullName: data.fullName,
			email: data.email,
			password: data.password,
			role: data.role || "user",
		});
		return {
			success: true,
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
				fullName: user.fullName,
			},
		};
	}
}

module.exports = AuthService;
