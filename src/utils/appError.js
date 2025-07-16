class AppError extends Error {
	constructor(message, statusCode, isOperational = true) {
		super(message);
		this.statusCode = statusCode || 500;
		this.isOperational = isOperational;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = AppError;
