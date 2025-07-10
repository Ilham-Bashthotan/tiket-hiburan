const { User } = require("../models");

class UserService {
	static async getAll() {
		return User.findAll();
	}

	static async getById(id) {
		return User.findByPk(id);
	}

	static async create(data) {
		return User.create(data);
	}

	static async update(id, data) {
		const user = await User.findByPk(id);
		if (!user) return null;
		await user.update(data);
		return user;
	}

	static async delete(id) {
		const user = await User.findByPk(id);
		if (!user) return null;
		await user.destroy();
		return user;
	}
}

module.exports = UserService;
