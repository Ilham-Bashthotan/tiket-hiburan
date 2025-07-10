const OrderService = require("../services/order.service");

class OrderController {
	static async getAll(req, res) {
		const orders = await OrderService.getAll();
		res.json(orders);
	}

	static async getById(req, res) {
		const order = await OrderService.getById(req.params.id);
		if (!order) return res.status(404).json({ message: "Order not found" });
		res.json(order);
	}

	static async create(req, res) {
		const order = await OrderService.create(req.body);
		res.status(201).json(order);
	}

	static async update(req, res) {
		const order = await OrderService.update(req.params.id, req.body);
		if (!order) return res.status(404).json({ message: "Order not found" });
		res.json(order);
	}

	static async delete(req, res) {
		const order = await OrderService.delete(req.params.id);
		if (!order) return res.status(404).json({ message: "Order not found" });
		res.json({ message: "Order deleted" });
	}
}

module.exports = OrderController;
