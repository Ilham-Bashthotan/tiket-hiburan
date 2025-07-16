const CategoryService = require("../services/category.service");
const AppError = require("../utils/appError");

class CategoryController {
	static async getAll(req, res, next) {
		try {
			const categories = await CategoryService.getAll();
			res.json(categories);
		} catch (err) {
			next(err);
		}
	}

	static async getById(req, res, next) {
		try {
			const category = await CategoryService.getById(req.params.id);
			if (!category) return next(new AppError("Category not found", 404));
			res.json(category);
		} catch (err) {
			next(err);
		}
	}

	static async create(req, res, next) {
		try {
			const category = await CategoryService.create(req.body);
			res.status(201).json(category);
		} catch (err) {
			next(err);
		}
	}

	static async update(req, res, next) {
		try {
			const category = await CategoryService.update(
				req.params.id,
				req.body
			);
			if (!category) return next(new AppError("Category not found", 404));
			res.json(category);
		} catch (err) {
			next(err);
		}
	}

	static async delete(req, res, next) {
		try {
			const category = await CategoryService.delete(req.params.id);
			if (!category) return next(new AppError("Category not found", 404));
			res.json({ message: "Category deleted" });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = CategoryController;
