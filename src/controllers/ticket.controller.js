const TicketService = require("../services/ticket.service");

class TicketController {
	static async getAll(req, res, next) {
		try {
			const tickets = await TicketService.getAll();
			res.json(tickets);
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
			const ticket = await TicketService.getById(req.params.id);
			if (!ticket)
				return next(
					new (require("../utils/appError"))(
						"Ticket not found",
						404,
						true
					)
				);
			res.json(ticket);
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
			const ticket = await TicketService.create(req.body);
			res.status(201).json(ticket);
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
			const ticket = await TicketService.update(req.params.id, req.body);
			if (!ticket)
				return next(
					new (require("../utils/appError"))(
						"Ticket not found",
						404,
						true
					)
				);
			res.json(ticket);
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
			const ticket = await TicketService.delete(req.params.id);
			if (!ticket)
				return next(
					new (require("../utils/appError"))(
						"Ticket not found",
						404,
						true
					)
				);
			res.json({ message: "Ticket deleted" });
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

module.exports = TicketController;
