"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Menambahkan kolom 'role' ke tabel Users
		await queryInterface.addColumn("Users", "role", {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "user",
		});
	},

	async down(queryInterface, Sequelize) {
		// Menghapus kolom 'role' dari tabel Users
		await queryInterface.removeColumn("Users", "role");
	},
};
