const OrderService = require("../services/order.service");
const AppError = require("../utils/appError");

class OrderController {
	static async getAll(req, res, next) {
		try {
			const orders = await OrderService.getAll();
			res.json(orders);
		} catch (err) {
			next(err);
		}
	}

	static async getById(req, res, next) {
		try {
			const order = await OrderService.getById(req.params.id);
			if (!order) return next(new AppError("Order not found", 404));
			res.json(order);
		} catch (err) {
			next(err);
		}
	}

	static async create(req, res, next) {
		try {
			const order = await OrderService.create(req.body);
			res.status(201).json(order);
		} catch (err) {
			next(err);
		}
	}

	static async update(req, res, next) {
		try {
			const order = await OrderService.update(req.params.id, req.body);
			if (!order) return next(new AppError("Order not found", 404));
			res.json(order);
		} catch (err) {
			next(err);
		}
	}

	static async delete(req, res, next) {
		try {
			const order = await OrderService.delete(req.params.id);
			if (!order) return next(new AppError("Order not found", 404));
			res.json({ message: "Order deleted" });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = OrderController;
