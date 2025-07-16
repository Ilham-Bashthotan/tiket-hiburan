const UserService = require("../services/user.service");

class UserController {
	static async getAll(req, res, next) {
		try {
			const users = await UserService.getAll();
			res.json(users);
		} catch (err) {
			next(
				new (require("../utils/appError"))(
					"Terjadi kesalahan server",
					500,
					false
				)
			);
		}
	}

	static async getById(req, res, next) {
		try {
			const user = await UserService.getById(req.params.id);
			if (!user)
				return next(
					new (require("../utils/appError"))(
						"User not found",
						404,
						true
					)
				);
			res.json(user);
		} catch (err) {
			next(
				new (require("../utils/appError"))(
					"Terjadi kesalahan server",
					500,
					false
				)
			);
		}
	}

	static async create(req, res, next) {
		try {
			const user = await UserService.create(req.body);
			res.status(201).json(user);
		} catch (err) {
			next(
				new (require("../utils/appError"))(
					"Terjadi kesalahan server",
					500,
					false
				)
			);
		}
	}

	static async update(req, res, next) {
		try {
			const user = await UserService.update(req.params.id, req.body);
			if (!user)
				return next(
					new (require("../utils/appError"))(
						"User not found",
						404,
						true
					)
				);
			res.json(user);
		} catch (err) {
			next(
				new (require("../utils/appError"))(
					"Terjadi kesalahan server",
					500,
					false
				)
			);
		}
	}

	static async delete(req, res, next) {
		try {
			const user = await UserService.delete(req.params.id);
			if (!user)
				return next(
					new (require("../utils/appError"))(
						"User not found",
						404,
						true
					)
				);
			res.json({ message: "User deleted" });
		} catch (err) {
			next(
				new (require("../utils/appError"))(
					"Terjadi kesalahan server",
					500,
					false
				)
			);
		}
	}
}

module.exports = UserController;
