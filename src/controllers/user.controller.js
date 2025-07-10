const UserService = require("../services/user.service");

class UserController {
	static async getAll(req, res) {
		const users = await UserService.getAll();
		res.json(users);
	}

	static async getById(req, res) {
		const user = await UserService.getById(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json(user);
	}

	static async create(req, res) {
		const user = await UserService.create(req.body);
		res.status(201).json(user);
	}

	static async update(req, res) {
		const user = await UserService.update(req.params.id, req.body);
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json(user);
	}

	static async delete(req, res) {
		const user = await UserService.delete(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found" });
		res.json({ message: "User deleted" });
	}
}

module.exports = UserController;
