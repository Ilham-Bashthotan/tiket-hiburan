'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
    // Menambahkan kolom 'refreshToken' ke tabel Users
		await queryInterface.addColumn("Users", "refreshToken", {
			type: Sequelize.TEXT,
			allowNull: true,
		});
	},

	async down(queryInterface, Sequelize) {
    // Menghapus kolom 'refreshToken' dari tabel Users
		await queryInterface.removeColumn("Users", "refreshToken");
	},
};
