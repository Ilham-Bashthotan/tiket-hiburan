require("dotenv").config();
const express = require("express");
const db = require("./src/models");
const userRoutes = require("./src/routes/user.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Selamat datang di API User Tiket Rekreasi" });
});

// Gunakan hanya user route
app.use("/api/users", userRoutes);

// Cek koneksi database
(async () => {
	try {
		await db.sequelize.authenticate();
		console.log("Koneksi database berhasil.");
		app.listen(PORT, () =>
			console.log(`Server berjalan di http://localhost:${PORT}`)
		);
	} catch (err) {
		console.error("Gagal koneksi ke database:", err);
	}
})();
