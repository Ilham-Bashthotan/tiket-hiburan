const { Order } = require("../models");

class OrderService {
	static async getAll() {
		return Order.findAll();
	}

	static async getById(id) {
		return Order.findByPk(id);
	}

	static async create(data) {
		return Order.create(data);
	}

	static async update(id, data) {
		const order = await Order.findByPk(id);
		if (!order) return null;
		await order.update(data);
		return order;
	}

	static async delete(id) {
		const order = await Order.findByPk(id);
		if (!order) return null;
		await order.destroy();
		return order;
	}
}

module.exports = OrderService;
