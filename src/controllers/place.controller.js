const PlaceService = require("../services/place.service");

class PlaceController {
	static async getAll(req, res, next) {
		try {
			const places = await PlaceService.getAll();
			res.json(places);
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
			const place = await PlaceService.getById(req.params.id);
			if (!place)
				return next(
					new (require("../utils/appError"))(
						"Place not found",
						404,
						true
					)
				);
			res.json(place);
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
			const place = await PlaceService.create(req.body);
			res.status(201).json(place);
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
			const place = await PlaceService.update(req.params.id, req.body);
			if (!place)
				return next(
					new (require("../utils/appError"))(
						"Place not found",
						404,
						true
					)
				);
			res.json(place);
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
			const place = await PlaceService.delete(req.params.id);
			if (!place)
				return next(
					new (require("../utils/appError"))(
						"Place not found",
						404,
						true
					)
				);
			res.json({ message: "Place deleted" });
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

module.exports = PlaceController;
