const CategoryService = require("../services/category.service");

class CategoryController {
	static async getAll(req, res, next) {
		try {
			const categories = await CategoryService.getAll();
			res.json(categories);
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
			const category = await CategoryService.getById(req.params.id);
			if (!category)
				return next(
					new (require("../utils/appError"))(
						"Category not found",
						404,
						true
					)
				);
			res.json(category);
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
			const category = await CategoryService.create(req.body);
			res.status(201).json(category);
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
			const category = await CategoryService.update(
				req.params.id,
				req.body
			);
			if (!category)
				return next(
					new (require("../utils/appError"))(
						"Category not found",
						404,
						true
					)
				);
			res.json(category);
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
			const category = await CategoryService.delete(req.params.id);
			if (!category)
				return next(
					new (require("../utils/appError"))(
						"Category not found",
						404,
						true
					)
				);
			res.json({ message: "Category deleted" });
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

module.exports = CategoryController;
