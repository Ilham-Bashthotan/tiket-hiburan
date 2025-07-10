const CategoryService = require("../services/category.service");

class CategoryController {
	static async getAll(req, res) {
		const categories = await CategoryService.getAll();
		res.json(categories);
	}

	static async getById(req, res) {
		const category = await CategoryService.getById(req.params.id);
		if (!category)
			return res.status(404).json({ message: "Category not found" });
		res.json(category);
	}

	static async create(req, res) {
		const category = await CategoryService.create(req.body);
		res.status(201).json(category);
	}

	static async update(req, res) {
		const category = await CategoryService.update(req.params.id, req.body);
		if (!category)
			return res.status(404).json({ message: "Category not found" });
		res.json(category);
	}

	static async delete(req, res) {
		const category = await CategoryService.delete(req.params.id);
		if (!category)
			return res.status(404).json({ message: "Category not found" });
		res.json({ message: "Category deleted" });
	}
}

module.exports = CategoryController;
