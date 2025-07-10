const { Category } = require("../models");

class CategoryService {
	static async getAll() {
		return Category.findAll();
	}

	static async getById(id) {
		return Category.findByPk(id);
	}

	static async create(data) {
		return Category.create(data);
	}

	static async update(id, data) {
		const category = await Category.findByPk(id);
		if (!category) return null;
		await category.update(data);
		return category;
	}

	static async delete(id) {
		const category = await Category.findByPk(id);
		if (!category) return null;
		await category.destroy();
		return category;
	}
}

module.exports = CategoryService;
