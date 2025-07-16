const OrderService = require("../services/order.service");

class OrderController {
	static async getAll(req, res, next) {
		try {
			const orders = await OrderService.getAll();
			res.json(orders);
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
			const order = await OrderService.getById(req.params.id);
			if (!order)
				return next(
					new (require("../utils/appError"))(
						"Order not found",
						404,
						true
					)
				);
			res.json(order);
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
			const order = await OrderService.create(req.body);
			res.status(201).json(order);
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
			const order = await OrderService.update(req.params.id, req.body);
			if (!order)
				return next(
					new (require("../utils/appError"))(
						"Order not found",
						404,
						true
					)
				);
			res.json(order);
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
			const order = await OrderService.delete(req.params.id);
			if (!order)
				return next(
					new (require("../utils/appError"))(
						"Order not found",
						404,
						true
					)
				);
			res.json({ message: "Order deleted" });
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

module.exports = OrderController;
