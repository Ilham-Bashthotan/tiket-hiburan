const PlaceService = require("../services/place.service");
const AppError = require("../utils/appError");

class PlaceController {
	static async getAll(req, res, next) {
		try {
			const places = await PlaceService.getAll();
			res.json(places);
		} catch (err) {
			next(err);
		}
	}

	static async getById(req, res, next) {
		try {
			const place = await PlaceService.getById(req.params.id);
			if (!place) return next(new AppError("Place not found", 404));
			res.json(place);
		} catch (err) {
			next(err);
		}
	}

	static async create(req, res, next) {
		try {
			const place = await PlaceService.create(req.body);
			res.status(201).json(place);
		} catch (err) {
			next(err);
		}
	}

	static async update(req, res, next) {
		try {
			const place = await PlaceService.update(req.params.id, req.body);
			if (!place) return next(new AppError("Place not found", 404));
			res.json(place);
		} catch (err) {
			next(err);
		}
	}

	static async delete(req, res, next) {
		try {
			const place = await PlaceService.delete(req.params.id);
			if (!place) return next(new AppError("Place not found", 404));
			res.json({ message: "Place deleted" });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = PlaceController;
