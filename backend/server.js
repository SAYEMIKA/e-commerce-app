import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userroute.js";
import productRouter from "./routes/productroute.js";
import cartRoute from "./routes/cartroute.js";
import orderRouter from "./routes/orderroute.js";
import dotenv from "dotenv";
import dns from 'dns';

// Set DNS Servers untuk mencegah timeout koneksi di Vercel
dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "*", 
    credentials: true
}));

// Inisialisasi koneksi Database & Cloudinary
connectDB()
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log("Database Connection Failed:", err.message));

try {
    connectCloudinary();
} catch (error) {
    console.log("Cloudinary Setup Error:", error.message);
}

// API Endpoints (Mendukung rute langsung atau dengan prefix /api)
app.use(['/user', '/api/user'], userRouter);
app.use(['/product', '/api/product'], productRouter);
app.use(['/cart', '/api/cart'], cartRoute);
app.use(['/order', '/api/order'], orderRouter);

// Fallback rute untuk verifikasi status API
app.get(['/', '/api'], (req, res) => {
    res.status(200).send("API ALBANI STORE WORKING");
});

// WAJIB UNTUK VERCEL: Export default objek app
export default app;