const TicketService = require("../services/ticket.service");
const AppError = require("../utils/appError");

class TicketController {
	static async getAll(req, res, next) {
		try {
			const tickets = await TicketService.getAll();
			res.json(tickets);
		} catch (err) {
			next(err);
		}
	}

	static async getById(req, res, next) {
		try {
			const ticket = await TicketService.getById(req.params.id);
			if (!ticket) return next(new AppError("Ticket not found", 404));
			res.json(ticket);
		} catch (err) {
			next(err);
		}
	}

	static async create(req, res, next) {
		try {
			const ticket = await TicketService.create(req.body);
			res.status(201).json(ticket);
		} catch (err) {
			next(err);
		}
	}

	static async update(req, res, next) {
		try {
			const ticket = await TicketService.update(req.params.id, req.body);
			if (!ticket) return next(new AppError("Ticket not found", 404));
			res.json(ticket);
		} catch (err) {
			next(err);
		}
	}

	static async delete(req, res, next) {
		try {
			const ticket = await TicketService.delete(req.params.id);
			if (!ticket) return next(new AppError("Ticket not found", 404));
			res.json({ message: "Ticket deleted" });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = TicketController;
