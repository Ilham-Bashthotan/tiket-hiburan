const AppError = require("../utils/appError");

function errorHandler(err, req, res, next) {
	if (err instanceof AppError) {
		// Operational error: tampilkan pesan ramah pengguna
		return res.status(err.statusCode).json({ message: err.message });
	}
	// Programmer error: tampilkan pesan generik dan log stack trace
	console.error(err);
	res.status(500).json({ message: "Terjadi kesalahan server" });
}

module.exports = errorHandler;
