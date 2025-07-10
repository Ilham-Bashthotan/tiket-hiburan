const { Place } = require("../models");

class PlaceService {
	static async getAll() {
		return Place.findAll();
	}

	static async getById(id) {
		return Place.findByPk(id);
	}

	static async create(data) {
		return Place.create(data);
	}

	static async update(id, data) {
		const place = await Place.findByPk(id);
		if (!place) return null;
		await place.update(data);
		return place;
	}

	static async delete(id) {
		const place = await Place.findByPk(id);
		if (!place) return null;
		await place.destroy();
		return place;
	}
}

module.exports = PlaceService;
