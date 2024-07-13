const express = require("express");
const app = express();
const cors = require("cors");
const router = require('./src/routes');
require("dotenv").config();
const morgan = require("morgan");

// Gunakan CORS
app.use(cors({
    origin: "*",  // Mengizinkan semua origin
    credentials: true,
}));

// Gunakan morgan untuk logging
app.use(morgan("combined")); // Gunakan 'combined' untuk log lebih rinci

// Gunakan express.json dan express.urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tambahkan logging untuk debugging
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Route test sederhana
app.get("/", (req, res) => {
    res.json({ message: "Welcome to test app" });
});

// Tambahkan middleware logging untuk setiap request
app.use((req, res, next) => {
    console.log('Time:', new Date().toLocaleString(), '- Request Type:', req.method, '- Request URL:', req.originalUrl);
    next();
});

// Rute utama
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ error: err.message });
});

// Tambahkan handler untuk 404
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

// Tentukan port dari environment atau gunakan 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
