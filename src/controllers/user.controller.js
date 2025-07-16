const UserService = require("../services/user.service");
const AppError = require("../utils/appError");

class UserController {
	static async getAll(req, res, next) {
		try {
			const users = await UserService.getAll();
			res.json(users);
		} catch (err) {
			next(err);
		}
	}

	static async getById(req, res, next) {
		try {
			const user = await UserService.getById(req.params.id);
			if (!user) return next(new AppError("User not found", 404));
			res.json(user);
		} catch (err) {
			next(err);
		}
	}

	static async create(req, res, next) {
		try {
			const user = await UserService.create(req.body);
			res.status(201).json(user);
		} catch (err) {
			next(err);
		}
	}

	static async update(req, res, next) {
		try {
			const user = await UserService.update(req.params.id, req.body);
			if (!user) return next(new AppError("User not found", 404));
			res.json(user);
		} catch (err) {
			next(err);
		}
	}

	static async delete(req, res, next) {
		try {
			const user = await UserService.delete(req.params.id);
			if (!user) return next(new AppError("User not found", 404));
			res.json({ message: "User deleted" });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = UserController;
