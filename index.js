require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./src/models");
const userRoutes = require("./src/routes/user.routes");
const categoryRoutes = require("./src/routes/category.routes");
const placeRoutes = require("./src/routes/place.routes");
const ticketRoutes = require("./src/routes/ticket.routes");
const orderRoutes = require("./src/routes/order.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ message: "Selamat datang di API User Tiket Rekreasi" });
});

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/orders", orderRoutes);

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
