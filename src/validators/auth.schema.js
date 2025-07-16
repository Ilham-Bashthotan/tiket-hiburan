const Joi = require("joi");

const loginSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"string.empty": "Email wajib diisi",
			"string.email": "Format email tidak valid",
			"any.required": "Email wajib diisi",
		}),
	password: Joi.string().min(6).max(30).required().messages({
		"string.empty": "Password wajib diisi",
		"string.min": "Password minimal 6 karakter",
		"string.max": "Password maksimal 30 karakter",
		"any.required": "Password wajib diisi",
	}),
});

const registerSchema = Joi.object({
	fullName: Joi.string().min(3).max(50).required().messages({
		"string.empty": "Nama lengkap wajib diisi",
		"string.min": "Nama lengkap minimal 3 karakter",
		"string.max": "Nama lengkap maksimal 50 karakter",
		"any.required": "Nama lengkap wajib diisi",
	}),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"string.empty": "Email wajib diisi",
			"string.email": "Format email tidak valid",
			"any.required": "Email wajib diisi",
		}),
	password: Joi.string().min(6).max(30).required().messages({
		"string.empty": "Password wajib diisi",
		"string.min": "Password minimal 6 karakter",
		"string.max": "Password maksimal 30 karakter",
		"any.required": "Password wajib diisi",
	}),
	role: Joi.string().valid("user", "admin").default("user"),
});

module.exports = { loginSchema, registerSchema };
