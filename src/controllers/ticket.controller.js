const TicketService = require("../services/ticket.service");

class TicketController {
	static async getAll(req, res) {
		const tickets = await TicketService.getAll();
		res.json(tickets);
	}

	static async getById(req, res) {
		const ticket = await TicketService.getById(req.params.id);
		if (!ticket)
			return res.status(404).json({ message: "Ticket not found" });
		res.json(ticket);
	}

	static async create(req, res) {
		const ticket = await TicketService.create(req.body);
		res.status(201).json(ticket);
	}

	static async update(req, res) {
		const ticket = await TicketService.update(req.params.id, req.body);
		if (!ticket)
			return res.status(404).json({ message: "Ticket not found" });
		res.json(ticket);
	}

	static async delete(req, res) {
		const ticket = await TicketService.delete(req.params.id);
		if (!ticket)
			return res.status(404).json({ message: "Ticket not found" });
		res.json({ message: "Ticket deleted" });
	}
}

module.exports = TicketController;
