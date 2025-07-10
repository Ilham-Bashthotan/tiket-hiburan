const PlaceService = require("../services/place.service");

class PlaceController {
	static async getAll(req, res) {
		const places = await PlaceService.getAll();
		res.json(places);
	}

	static async getById(req, res) {
		const place = await PlaceService.getById(req.params.id);
		if (!place) return res.status(404).json({ message: "Place not found" });
		res.json(place);
	}

	static async create(req, res) {
		const place = await PlaceService.create(req.body);
		res.status(201).json(place);
	}

	static async update(req, res) {
		const place = await PlaceService.update(req.params.id, req.body);
		if (!place) return res.status(404).json({ message: "Place not found" });
		res.json(place);
	}

	static async delete(req, res) {
		const place = await PlaceService.delete(req.params.id);
		if (!place) return res.status(404).json({ message: "Place not found" });
		res.json({ message: "Place deleted" });
	}
}

module.exports = PlaceController;
