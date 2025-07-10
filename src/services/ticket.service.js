const { Ticket } = require("../models");

class TicketService {
	static async getAll() {
		return Ticket.findAll();
	}

	static async getById(id) {
		return Ticket.findByPk(id);
	}

	static async create(data) {
		return Ticket.create(data);
	}

	static async update(id, data) {
		const ticket = await Ticket.findByPk(id);
		if (!ticket) return null;
		await ticket.update(data);
		return ticket;
	}

	static async delete(id) {
		const ticket = await Ticket.findByPk(id);
		if (!ticket) return null;
		await ticket.destroy();
		return ticket;
	}
}

module.exports = TicketService;
